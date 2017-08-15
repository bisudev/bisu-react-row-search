import { fromJS } from 'immutable'

export const searchState = fromJS({
  q: '',
})

export const formState = fromJS({
  id: 0,
  student_id: 0,
  student_id_input: '',
  student_name: '',
})
export const formState2 = fromJS({
  id: 0,
  student_id: 0,
  student_id_input: '',
  student_name: '',
})

const initialState = fromJS({
  list: [],
  searchResults: [],
  searching: false,
})

export default function student(state = initialState, action) {
  switch (action.type) {
    case 'STUD_Q':
      return state.set('searching', true)

    case 'STUD_Q_OFF': {
      // offline search query
      const term = action.meta.term.replace('%', '.*')
      const regex = new RegExp('^' + term, 'i')
      const filtered = state
        .get('offlineListO')
        .filter(
          item =>
            item.get('code').search(regex) > -1 ||
            item.get('name').search(regex) > -1
        )
      return state.set('offlineListF', filtered)
    }

    case 'STUD_Q_SUCCESS':
      return state
        .set('searching', false)
        .set('searchResults', fromJS(action.payload.data || []))

    case 'STUD_GET_SUCCESS':
      return state.set('list', fromJS(action.payload.data || []))

    case 'STUD_Q_FAIL':
      return state.set('searching', false)

    default:
      return state
  }
}
