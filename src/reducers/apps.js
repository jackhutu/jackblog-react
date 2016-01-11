import {SUCCESS_GET_APPS,FAILURE_GET_APPS} from '../actions/ActionTypes'
import { createReducer } from 'redux-immutablejs'
import {Map,List} from 'immutable'

export default createReducer(List(), {
  [FAILURE_GET_APPS]: (state, action) => state,
  [SUCCESS_GET_APPS]: (state,action) => state.merge(action.apps)
})