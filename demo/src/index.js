import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Demo from './demo'

import configureStore from './configure-store'
const store = configureStore()

const Main = () =>
  <Provider store={store}>
    <Demo />
  </Provider>

render(<Main />, document.querySelector('#demo'))
