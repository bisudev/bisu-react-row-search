export const searchStudent = term => {
  return {
    type: 'STUD_Q',
    payload: {
      request: {
        url: '/students?q=' + term,
      },
    },
  }
}

export const fetchStudents = () => {
  return {
    type: 'STUD_GET',
    payload: {
      request: {
        url: '/students',
      },
    },
  }
}
/*import { fromJS } from 'immutable'
import { CALL_API } from 'redux-api-middleware'

export const searchStudent = (term) => {
  const request = {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
    endpoint: 'http://localhost:1500/students?q='+term,
  }
  request.types = ['STUD_Q_REQ', 'STUD_Q_SUCC', '_FAIL']
  return { [CALL_API]: request }
}

export const fetchStudents = () => {
  const request = {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
    endpoint: 'http://localhost:1500/students',
  }
  request.types = ['STUD_REQ', 'STUD_GET_SUCC', '_FAIL']
  return { [CALL_API]: request }
}
*/
