import * as React from '../../../../DataFinder/node_modules/react'
import { ParticipantGroupSummary } from '../../../../DataFinder/src/client/DataFinder/components/Banner';

// Styling imports
import './RstudioViewer.scss';
import { SelectedFilters } from '../../../../DataFinder/src/client/typings/CubeData';
import { FilterSummary, FilterIndicatorList, AssayFilterIndicatorList } from '../../../../DataFinder/src/client/DataFinder/components/FilterSummary';

const RStudioViewer: React.FC = () => {
    const [participantGroup, setParticipantGroup] = React.useState(null)
    const [refresh, setRefresh] = React.useState(0)
    let sf = null;
    let groupSummary = null;
    let counts = null;

    React.useEffect(() => {
        LABKEY.Ajax.request({
            url: LABKEY.ActionURL.buildURL("participant-group", "getSessionParticipantGroup.api", "Studies"),
            method: 'GET',
            success: function (response) {
                var res = JSON.parse(response.responseText);
                if (res.success) {
                    setParticipantGroup(res.data)
                }
            }
        });
    }, [refresh])

            if (participantGroup == null) {
                return <> </>
            }
            if (participantGroup.filters) {
                sf = new SelectedFilters(JSON.parse(participantGroup.filters));
                console.log(sf)
                const description = JSON.parse(participantGroup.description)
                if (description) {
                    groupSummary = description.summary ?? description
                    counts = description.counts
                } else groupSummary = {
                    id: participantGroup.rowId,
                    label: participantGroup.label,
                    isSaved: true
                }
            }
            return (
                <> 
                    <button style={{display: "block"}} onClick={() => setRefresh(refresh + 1)}>Refresh</button>
                    <h2>{"Current group: " + groupSummary.label}</h2>
                    <em>{counts.participant} participants from {counts.study} studies</em>

                    <hr></hr>
                    <div style={{display: "inline-block"}}>
                    <FilterIndicatorList 
                        filterClass={"Study"}
                        filters={sf.Study}
                        title={""}
                        indicateNoFilters={false} />
                    <FilterIndicatorList 
                        filterClass={"Subject"}
                        filters={sf.Subject}
                        title={""}
                        indicateNoFilters={false} />
                    <AssayFilterIndicatorList
                        filters={sf.Data}
                        title={""}
                        indicateNoFilters={false}  />
                    </div>
                    <hr></hr>
                    
                    <p className="description">
                        You may edit these filters or load a different participant group
                        from the "Find Participants" page in ImmuneSpace. After editing,
                        click "refresh" for this panel to reflect the changes. 
                    </p>
                    <p className="description">
                        To acces info about selected participants:
                    </p>
                    <pre>
                    {"con <- CreateConnection(\"\")\ndemographics <- con$getDataset(\"demographics\")"}   
                    </pre>
                </>

                    
    
            )
        }

export const App: React.FC = () => {
    // Must return a React Fragment
    return <RStudioViewer/>
}