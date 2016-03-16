import { SHOW_MSG,HIDE_MSG } from '../actions/ActionTypes'
import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'

const initialState = fromJS({
	type: '',
	content: '',
	title: ''
})

export default createReducer(initialState, {
  [SHOW_MSG]: (state, action) => state.merge(action.message),
  [HIDE_MSG]: (state, action) => state.merge(initialState)
})