import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { App } from './RstudioViewer'

window.addEventListener('DOMContentLoaded', (event) => {
    ReactDOM.render(<App/>, document.getElementById('rstudio-viewer'));
});