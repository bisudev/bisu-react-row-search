import { combineReducers } from 'redux'
import { createForms } from 'react-redux-form/immutable'

import student, { formState } from './reducer1'

export default combineReducers({
  student,
  // react-redux-form
  ...createForms({
    formState,
  })
})
