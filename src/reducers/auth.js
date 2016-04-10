import {
  LOGIN_SUCCESS,
  GET_USERINFO_SUCCESS,
  LOGOUT_USER,
  USERINFO_FAILURE,
  UPDATE_USER_SUCCESS
} from '../actions/types'
import {getCookie} from '../utils/authService'
import { createReducer } from 'redux-immutablejs'
import {fromJS} from 'immutable'

const initialState = fromJS({
  token: getCookie('token') || null,
  user: null
})

export default createReducer(initialState,{
  [LOGIN_SUCCESS]: (state,action)=>{
    return state.merge({
      token: action.token
    })
  },
  [GET_USERINFO_SUCCESS]: (state,{json})=>{
    return state.merge({
      user: json
    })
  },
  [USERINFO_FAILURE]: (state,action)=> state.set('user',null),
  [LOGOUT_USER]: (state,action)=> initialState.set('token',null),
  [UPDATE_USER_SUCCESS]: (state,action)=> {
    return state.merge({
      user: action.user
    })
  }
})