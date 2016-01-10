import {TAG_LIST,CHANGE_OPTIONS} from '../actions/ActionTypes'
import { createReducer } from 'redux-immutablejs'
import {fromJS,Map,List} from 'immutable'


const initialState = fromJS({currentPage: 1, itemsPerPage: 10,sortName:'publish_time',tagId: ''})

export default createReducer(initialState, {
  [CHANGE_OPTIONS]: (state, action) => state.merge(action.option)
})