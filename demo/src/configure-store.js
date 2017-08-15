import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'
import logger from 'redux-logger'

// local modules
import rootReducer from './reducers'

const client = axios.create({
  baseURL: 'http://localhost:1500',
  responseType: 'json',
})

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, axiosMiddleware(client), logger),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
}
