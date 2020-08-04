import * as React from 'react'
import { Query} from '@labkey/api';
import { Greeter } from "immunespace-react-tools"

// Styling imports
import './RstudioViewer.scss';

const RStudioViewer: React.FC = () => {
    const [data, setData] = React.useState({sf: null, groupSummary: null, counts: null})
    const [refresh, setRefresh] = React.useState(0)
    let noFilters = true;
    if (data.sf) {
        const filters = data.sf;
        if (
            !(filters.get("Subject").size == 0 &&
            filters.get("Study").size == 0 &&
            filters.getIn(["Data", "Assay", "Timepoint"]) == undefined &&
            filters.getIn(["Data", "Assay", "Assay"]) == undefined &&
            filters.getIn(["Data", "Assay", "SampleType"]) == undefined &&
            filters.getIn(["Data", "SampleType", "SampleType"]) == undefined &&
            filters.getIn(["Data", "SampleType", "Assay"]) == undefined &&
            filters.getIn(["Data", "Timepoint", "Timepoint"]) == undefined &&
            filters.getIn(["Data", "Timepoint", "SampleType"]) == undefined)
        ) {
            noFilters = false
        }
    }

    React.useEffect(() => {
        new Promise((resolve, reject) => LABKEY.Ajax.request({
            url: LABKEY.ActionURL.buildURL("participant-group", "getSessionParticipantGroup.api", "Studies"),
            method: 'GET',
            success: function (response: XMLHttpRequest) {
                var res = JSON.parse(response.responseText);
                console.log(res)
                if (res.success) {
                    resolve(res)
                }
            }
        })).then((res: any) => new Promise((resolve, reject) => {
            let groupSummary = null;
            let counts = null
            if (res.data?.filters) {
                // const sf = new SelectedFilters(JSON.parse(res.data.filters));
                const sf = null;
                const description = JSON.parse(res.data.description)
                if (description) {
                    groupSummary = description.summary ?? description
                    counts = description.counts
                } else groupSummary = {
                    id: res.data.rowId,
                    label: res.data.label,
                    isSaved: true
                }
                resolve({sf: sf, groupSummary: groupSummary, counts: counts})
            } else {
                counts = {participant: "__", study: "__"}
                Query.executeSql({
                    containerPath: "Studies/",
                    schemaName: "study",
                    sql: "SELECT count(ParticipantId) as participant_count, count(Distinct(Study)) as study_count FROM Participant;",
                    failure: (error) => {console.log(error)},
                    success: (data) => {
                        counts.participant = data.rows[0].participant_count;
                        counts.study = data.rows[0].study_count;
                        // resolve({sf: new SelectedFilters(), groupSummary: {label: ""}, counts: counts})
                        resolve({sf: null, groupSummary: {label: ""}, counts: counts})
                     }
                })
            }
        })
        ).then((res: any) => {
            setData(res)
        })
    }, [refresh])
            // if (data.sf == null) {
            //     return <> </>
            // }
           
            return (
                <> 
                    <Greeter name="helen"></Greeter>
                    <button style={{display: "block"}} onClick={() => setRefresh(refresh + 1)}>Refresh</button>
                    {data.sf && <> 
                        <h2>{"Current group: " + data.groupSummary.label}</h2>
                        <em>{data.counts.participant} participants from {data.counts.study} studies</em>
                    </>}
                    

                    <hr></hr>
                    <div style={{display: "inline-block"}}>
                        {noFilters && <em className="filter-indicator no-filters">No filters currently applied</em>}
                        {/* {!noFilters && <>
                            <FilterIndicatorList 
                                filterClass={"Study"}
                                filters={data.sf.Study}
                                indicateNoFilters={false} />
                            <FilterIndicatorList 
                                filterClass={"Subject"}
                                filters={data.sf.Subject}
                                indicateNoFilters={false} />
                            <AssayFilterIndicatorList
                                filters={data.sf.Data}
                                indicateNoFilters={false}  />
                        </>
                        } */}
                    </div>
                    <hr></hr>
                    
                    <p>
                        You may edit these filters or load a different participant group
                        from the "Find Participants" page in ImmuneSpace. After editing,
                        click "refresh" for this panel to reflect the changes. 
                    </p>
                    <p>
                        To create a connection with these filters applied: 
                    </p>
                    <code>
                    {"con <- CreateConnection(\"\")"}   
                    </code>
                    <p>
                        You may then access data for the selected participants 
                        with <code>con$getDataset()</code>. See the "help" tab
                        for additional documentation. 
                    </p>
                </>

                    
    
            )
        }

export const App: React.FC = () => {
    // Must return a React Fragment
    return <RStudioViewer/>
}