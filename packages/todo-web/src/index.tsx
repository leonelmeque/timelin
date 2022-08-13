import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { ClickToComponent } from 'click-to-react-component'

ReactDOM.render(
  <React.StrictMode>
    <ClickToComponent />
    <App />
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
)
