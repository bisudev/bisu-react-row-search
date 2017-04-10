import { fromJS } from 'immutable'
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
