import { CHANGE_OPTIONS } from '../actions/types'
import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'

const initialState = fromJS({currentPage: 1, itemsPerPage: 10,sortName:'publish_time',tagId: ''})

export default createReducer(initialState, {
  [CHANGE_OPTIONS]: (state, action) => state.merge(action.option)
})