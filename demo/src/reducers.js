import { combineReducers } from 'redux'
import { createForms } from 'react-redux-form/immutable'

import student, { formState, formState2 } from './reducer1'

export default combineReducers({
  student,
  // react-redux-form
  ...createForms({
    formState,
    formState2,
  })
})
