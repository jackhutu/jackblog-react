import {LOGIN_SUCCESS,LOGIN_FAILURE,USERINFO_SUCCESS,LOGOUT_USER,USERINFO_FAILURE,UPDATE_USER_SUCCESS,UPDATE_USER_FAILURE} from '../actions/ActionTypes'
import {saveCookie,getCookie,signOut} from '../utils/authService'
import { createReducer } from 'redux-immutablejs'
import {fromJS,Map,List} from 'immutable'

const initialState = fromJS({
	token: getCookie('token') || null,
	user: null,
	errMsg:null
})

export default createReducer(initialState,{
	[LOGIN_SUCCESS]: (state,action)=>{
		return state.merge({
			errMsg: null,
			token: action.token
		})
	},
	[LOGIN_FAILURE]: (state,action)=> state.set('errMsg',action.errMsg),
	[USERINFO_SUCCESS]: (state,action)=>{
		return state.merge({
			errMsg: null,
			user: action.user
		})
	},
	[USERINFO_FAILURE]: (state,action)=> state.set('user',null),
	[LOGOUT_USER]: (state,action)=> initialState.set('token',null),
	[UPDATE_USER_FAILURE]: (state,action)=> state.set('errMsg',action.errMsg),
	[UPDATE_USER_SUCCESS]: (state,action)=> {
		return state.merge({
			errMsg: null,
			user: action.user
		})
	}
})
