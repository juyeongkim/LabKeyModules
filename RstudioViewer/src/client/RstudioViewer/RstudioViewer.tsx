import * as React from '../../../../DataFinder/node_modules/react'
import { FilterBanner } from '../../../../DataFinder/src/client/Banner/FilterBanner';

// Styling imports
import './RstudioViewer.scss';

const RStudioViewer: React.FC = () => {
    return <FilterBanner show={true}/>
}

export const App: React.FC = () => {
    // Must return a React Fragment
    return <RStudioViewer/>
}