import { fromJS } from 'immutable'

export const formState = fromJS({
  id: 0,
  student_id: 0,
  student_id_input: '',
  student_name: '',
})

const initialState = fromJS({
  searchResults: [],
  searching: false,
})

export default function student(state = initialState, action) {
  switch (action.type) {
    case 'STUD_Q_REQ':
      return state.set('searching', true)

    case 'STUD_Q_SUCC':
      return state
        .set('searching', false)
        .set('searchResults', fromJS(action.payload || []))

    case '_FAIL':
      return state.set('searching', false)

    default:
      return state

  }
}
