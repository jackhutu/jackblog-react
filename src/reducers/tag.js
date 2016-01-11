import {TAG_LIST} from '../actions/ActionTypes'
import { createReducer } from 'redux-immutablejs'
import {Map,List} from 'immutable'

export default createReducer(List(), {
  [TAG_LIST]: (state, action) => state.merge(action.tagList)
})
