import React from 'react'

import DemoAjax from './demo-ajax'
import DemoOffline from './demo-offline'
import DemoDisabled from './demo-disabled'
import './demo.scss'

const Demo = () =>
  <div className="container">
    <div className="row justify-content-md-center">
      <div className="col-sm-6 col-sm-offset-3">
        <h1>bisu-react-row-search Demo</h1>
        <hr />
        <DemoAjax />
        <hr />
        <DemoOffline />
        <hr />
        <DemoDisabled />
      </div>
    </div>
  </div>

export default Demo
