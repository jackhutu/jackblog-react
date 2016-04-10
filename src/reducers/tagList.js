import { TAG_LIST_SUCCESS, TAG_LIST_FAILURE } from '../actions/types'
import { createReducer } from 'redux-immutablejs'
import {List} from 'immutable'

export default createReducer(List(), {
  [TAG_LIST_SUCCESS]: (state, {json}) => state.merge(json.data),
  [TAG_LIST_FAILURE]: (state) => state
})