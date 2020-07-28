import * as React from '../../../../DataFinder/node_modules/react'
import * as ReactDOM from '../../../../DataFinder/node_modules/react-dom'

import { App } from './RstudioViewer'

window.addEventListener('DOMContentLoaded', (event) => {
    ReactDOM.render(<App/>, document.getElementById('rstudio-viewer'));
});