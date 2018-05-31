//react entrypoint
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'

window.onresize = () => {
    window.document.getElementById('root').style.width = `${window.innerWidth}px`
    window.document.getElementById('root').style.height = `${window.innerHeight}px`
}
window.setTimeout(() => window.dispatchEvent(new Event('resize')), 0)
ReactDOM.render(<App />, document.getElementById('root'))
