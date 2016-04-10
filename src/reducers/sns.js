import { GET_SNSLOGINS_SUCCESS,GET_SNSLOGINS_FAILURE} from '../actions/types'
import { createReducer } from 'redux-immutablejs'
import {fromJS} from 'immutable'

export default createReducer(fromJS({
  logins:[]
}), {
  [GET_SNSLOGINS_FAILURE]: (state, action) => state.set('logins',[]),
  [GET_SNSLOGINS_SUCCESS]: (state,{json}) => state.set('logins',json.data)
})