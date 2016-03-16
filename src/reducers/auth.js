import {LOGIN_SUCCESS,USERINFO_SUCCESS,LOGOUT_USER,USERINFO_FAILURE,UPDATE_USER_SUCCESS} from '../actions/ActionTypes'
import {saveCookie,getCookie,signOut} from '../utils/authService'
import { createReducer } from 'redux-immutablejs'
import {fromJS,Map,List} from 'immutable'

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
	[USERINFO_SUCCESS]: (state,action)=>{
		return state.merge({
			user: action.user
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