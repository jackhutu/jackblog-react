import { GET_APPS_SUCCESS,GET_APPS_FAILURE } from '../actions/types'
import { createReducer } from 'redux-immutablejs'
import {List} from 'immutable'

export default createReducer(List(), {
  [GET_APPS_FAILURE]: (state, action) => state,
  [GET_APPS_SUCCESS]: (state,{json}) => state.merge(json.data)
})