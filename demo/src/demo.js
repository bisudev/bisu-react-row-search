import React from 'react'

import DemoAjax from './demo-ajax'
import DemoOffline from './demo-offline'
import DemoDisabled from './demo-disabled'
import './demo.scss'

const Demo = () =>
  <div className="row">
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

export default Demo
