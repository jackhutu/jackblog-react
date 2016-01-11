import {SUCCESS_GET_SNSLOGINS,FAILURE_GET_SNSLOGINS} from '../actions/ActionTypes'
import { createReducer } from 'redux-immutablejs'
import {fromJS,Map,List} from 'immutable'

export default createReducer(fromJS({
	logins:[]
}), {
  [FAILURE_GET_SNSLOGINS]: (state, action) => state.set('logins',[]),
  [SUCCESS_GET_SNSLOGINS]: (state,action) => state.set('logins',action.logins)
})