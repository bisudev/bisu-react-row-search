import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import {render} from 'react-dom'

import configureStore from './configure-store'
const store = configureStore()

import Demo from './demo'

const Main = () => (
  <Provider store={store}>
    <Demo />
  </Provider>
)

render(<Main/>, document.querySelector('#demo'))
