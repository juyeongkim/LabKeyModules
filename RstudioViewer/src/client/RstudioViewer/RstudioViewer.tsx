import * as React from '../../../../DataFinder/node_modules/react'
import { Banner } from '../../../../DataFinder/src/client/DataFinder/components/Banner';

// Styling imports
import './RstudioViewer.scss';

const RStudioViewer: React.FC = () => {
    const [participantGroup, setParticipantGroup] = React.useState(null)
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
                    setParticipantGroup(res)
                }
            }
        });
    }, [])

            if (participantGroup == null) {
                return <> </>
            }
            if (participantGroup.filters) {
                const sf = JSON.parse(participantGroup.filters);
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
                <div id="data-finder-banner">
                    <Banner
                        filters={sf}
                        counts={counts}
                        groupSummary={groupSummary}
                        manageGroupsDropdown={<></>}
                    />
                </div>
    
            )
        }

export const App: React.FC = () => {
    // Must return a React Fragment
    return <RStudioViewer/>
}