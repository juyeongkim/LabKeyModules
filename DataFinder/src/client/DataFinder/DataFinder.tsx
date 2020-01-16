import "./DataFinder.scss";
import React, { memo } from 'react';
// import {olap} from '../olap/olap'
import { CubeData, Filter, SelectedFilters } from '../typings/CubeData';
import * as CubeHelpers from './helpers/CubeHelpers';
import * as ParticipantGroupHelpers from './helpers/ParticipantGroup';
import { toggleFilter } from './helpers/SelectedFilters';
import { StudyParticipantCount, StudyInfo } from '../typings/StudyCard'
import { StudyCard } from './components/StudyCard'
import { Map, List } from 'immutable';
import { ActionButton, LoadDropdown } from './components/ActionButton'
import { FilterDropdown } from './components/FilterDropdown'
import { FilterSummary } from './components/FilterIndicator'
import { Barplot } from './components/Barplot'
import { HeatmapSelector, SampleTypeCheckbox } from './components/HeatmapSelector';
import Tabs from "./components/Tabs";
import * as d3 from 'd3'

interface DataFinderControllerProps {
    mdx: any
}

const DataFinderController: React.FC<DataFinderControllerProps> = (props: DataFinderControllerProps) => {
    // Constants -------------------------------------
    const mdx = props.mdx;
    const cd = new CubeData({})
    const sf = new SelectedFilters(JSON.parse(localStorage.getItem("dataFinderSelectedFilters")));

    // state -----
    const [cubeData, setCubeData] = React.useState<CubeData>(cd)
    const [studyDict, setStudyDict] = React.useState({}); // this should only be loaded once
    const [studyParticipantCounts, setStudyParticipantCounts] = React.useState<List<StudyParticipantCount>>(List())
    const [appliedFilters, setAppliedFilters] = React.useState<SelectedFilters>(sf)
    const [selectedFilters, setSelectedFilters] = React.useState<SelectedFilters>(appliedFilters)
    const [showSampleType, setShowSampleType] = React.useState<boolean>(false)
    const [availableGroups, setAvailableGroups] = React.useState([])

    // Listeners
    const [saveCounter, setSaveCounter] = React.useState<number>(0)
    const [applyCounter, setApplyCounter] = React.useState<number>(0)
    const [loadedGroup, setLoadedGroup] = React.useState<string>()
    const [groupCounter, setGroupCounter] = React.useState<number>(0);



    // Effects  -------------------------------------


    // Do these things only when the page loads --------
    React.useEffect(() => {
        // load data
        CubeHelpers.getStudyDict(mdx, appliedFilters).then((sd) => {
            setStudyDict(sd)
        })
        ParticipantGroupHelpers.getAvailableGroups().then((data) => {
            const groups = ParticipantGroupHelpers.createAvailableGroups(data)
            setAvailableGroups(groups)
        })
    }, [])

    // Do these things when certain variables are incremented --------
    // Apply filters
    React.useEffect(() => {
        // set applied filters
        setAppliedFilters(selectedFilters)
        // set local storage
        localStorage.setItem("dataFinderSelectedFilters", JSON.stringify(selectedFilters))
    }, [applyCounter])

    React.useEffect(() => {
        // Update local state
        // separated from above effect so filters can pop up in banner before data is finished updating
        CubeHelpers.getStudyParticipantCounts(mdx, selectedFilters)
            .then((spc) => setStudyParticipantCounts(CubeHelpers.createStudyParticipantCounts(spc)))
        CubeHelpers.getCubeData(mdx, selectedFilters)
            .then((cd) => setCubeData(CubeHelpers.createCubeData(cd)))
        CubeHelpers.getParticipantIds(mdx, selectedFilters).then((pids) =>
            ParticipantGroupHelpers.saveParticipantIdGroupInSession(pids)
        )
    }, [appliedFilters])



    // Save group
    React.useEffect(() => {
        // saveGroup(selectedFilters)
    }, [saveCounter])

    // Load group
    React.useEffect(() => {
        // load group
        // make api calls 
        applyFilters()
    }, [loadedGroup, groupCounter])

    // Helper functions ---------------------------------------------
    // These are functions which will get passed down to those components
    // which can cause updates to the page
    const Banner = memo(FilterSummary)

    // ------ filter-related -------
    const getFilters = () => {
        console.log("getFilters()")
        // get filters from local storage
        // set SelectedFilters
    }

    const filterClick = (dim: string, filter: Filter) => {
        console.log("filterClick()")
        return (() => {
            const sf = toggleFilter(dim, filter.level, filter.member, selectedFilters)
            setSelectedFilters(sf)
        })
    }

    const applyFilters = () => {
        console.log("applyFilters()")
        setApplyCounter(applyCounter + 1)
    }

    const clearFilters = () => {
        d3.select("#barplot-Age")
        // debugger;
        setSelectedFilters(new SelectedFilters());
        applyFilters()
    }
    // ----------------

    // ----- participant group-related -----
    const saveParticipantGroup = () => {
        ParticipantGroupHelpers.saveParticipantGroup("group")
        setSaveCounter(saveCounter + 1)
    }

    const loadParticipantGroup = (groupName: string) => {
        ParticipantGroupHelpers.loadParticipantGroup(groupName)
        setLoadedGroup(groupName)
        setGroupCounter(groupCounter + 1)
    }


    // ------ Other ------
    const toggleSampleType = () => {
        setShowSampleType(!showSampleType)
    }


    // ----- define the various tabs -----
    const tabs = {
        intro: {
            content: <h1>Find Groups</h1>,
            id: "intro",
            tag: "intro",
            text: "Groups"
        },
        data: {
            content: <>

                <ActionButton text={"Apply"} onClick={applyFilters} />
                <SampleTypeCheckbox
                    toggleShowSampleType={toggleSampleType}
                    showSampleType={showSampleType} />
                <HeatmapSelector
                    data={cubeData.Data.toJS()}
                    filterClick={filterClick}
                    showSampleType={showSampleType}
                    selected={selectedFilters.Data} />
            </>,
            id: "data",
            tag: "find-data",
            text: "By Available Data",
            tabClass: "pull-right"
        },
        participant: {
            content: <>
                <div className="row">
                    <div className="col-sm-3">
                        <h2>Participant Characteristics</h2>
                        <p>Participant data available based on current filters</p>
                    </div>
                    <div className="col-sm-3">
                        <Barplot data={cubeData.getIn(["Subject", "Gender"]).toJS()} name={"Gender"} height={200} width={250} dataRange={[0, 3000]} />
                    </div>
                    <div className="col-sm-3">
                        <Barplot data={cubeData.getIn(["Subject", "Age"]).toJS()} name="Age" height={200} width={250} dataRange={[0,3000]} />
                    </div>
                </div>
                <ActionButton text={"Apply"} onClick={applyFilters} />
                <FilterDropdown
                    key={"Age"}
                    dimension={"Subject"}
                    level={"Age"}
                    members={cubeData.getIn(["Subject", "Age"]).map((e) => { return (e.get("member")) })}
                    filterClick={filterClick}
                    selected={selectedFilters.Subject.get("Age")} />
                <FilterDropdown
                    key={"Race"}
                    dimension={"Subject"}
                    level={"Race"}
                    members={cubeData.getIn(["Subject", "Race"]).map((e) => { return (e.get("member")) })}
                    filterClick={filterClick}
                    selected={selectedFilters.Subject.get("Race")} />
                <FilterDropdown
                    key={"Gender"}
                    dimension={"Subject"}
                    level={"Gender"}
                    members={cubeData.getIn(["Subject", "Gender"]).map((e) => { return (e.get("member")) })}
                    filterClick={filterClick}
                    selected={selectedFilters.Subject.get("Gender")} />
            </>,
            id: "participant",
            tag: "find-participant",
            text: "By Participant Characteristics",
            tabClass: "pull-right"
        },
        study: {
            content: <>
                <div className="row">
                    <div className="col-sm-3">
                        <h2>Study Characteristics</h2>
                        <p>
                            Study characteristics available based on current filters
                          <br />
                            <em>View individual studies in the "studies" tab</em>
                        </p>
                    </div>
                    <div className="col-sm-3">
                        <Barplot data={cubeData.getIn(["Study", "Condition"]).toJS()} name="Condition" height={200} width={300} dataRange={[0, 200]} />
                    </div>
                </div>
                <ActionButton text={"Apply"} onClick={applyFilters} />
                <FilterDropdown
                    key={"Study"}
                    dimension={"Study"}
                    level={"Condition"}
                    members={cubeData.getIn(["Study", "Condition"]).map((e) => { return (e.get("member")) })}
                    filterClick={filterClick}
                    selected={selectedFilters.Study.get("Condition")} />
                <FilterDropdown
                    key={"Category"}
                    dimension={"Study"}
                    level={"Category"}
                    members={cubeData.getIn(["Study", "Category"]).map((e) => { return (e.get("member")) })}
                    filterClick={filterClick}
                    selected={selectedFilters.Study.get("Category")} />

                {studyParticipantCounts.map((sdy) => {
                    if (sdy.participantCount > 0 && studyDict[sdy.studyName]) {
                        return (
                            <StudyCard key={sdy.studyName}
                                study={studyDict[sdy.studyName]}
                                participantCount={sdy.participantCount} />
                        )
                    }
                })}
            </>,
            id: "study",
            tag: "find-study",
            text: "By Study Design",
            tabClass: "pull-right",
        },
    }


    return (
        <div>
            {/* <pre>
                {JSON.stringify(cubeData.toJS(), undefined, 2)}
                {JSON.stringify(studyDict.toJS(), undefined, 2)}
            </pre> */}
            <ActionButton text={"Save"} onClick={saveParticipantGroup} />
            <ActionButton text={"Clear"} onClick={clearFilters} />
            <ActionButton text={"Reset"} onClick={getFilters} />
            <LoadDropdown groups={availableGroups} loadParticipantGroup={loadParticipantGroup} />
            <Banner filters={appliedFilters} />

            <Tabs tabs={tabs} defaultActive="intro" />


            {/* <pre>{JSON.stringify(selectedFilters.toJS(), null, 2)}</pre> */}
        </div>
    )

}

export const App: React.FC = () => {

    const [cubeReady, setCubeReady] = React.useState(false)
    // debugger
    const dfcube = LABKEY.query.olap.CubeManager.getCube({
        configId: 'DataFinder:/DataFinderCube',
        schemaName: 'DataFinder',
        name: 'DataFinderCube'
    })
    React.useEffect(() => {
        dfcube.onReady((mdx) => {
            setCubeReady(true)
        })
    }, [])

    if (cubeReady) {
        return <DataFinderController mdx={dfcube.mdx} />
    }
    return <div></div>
}
