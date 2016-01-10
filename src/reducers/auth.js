import {LOGIN_SUCCESS,LOGIN_FAILURE,USERINFO_SUCCESS,LOGOUT_USER,USERINFO_FAILURE,UPDATE_USER_SUCCESS,UPDATE_USER_FAILURE} from '../actions/ActionTypes'
import cookie from 'react-cookie'
import { createReducer } from 'redux-immutablejs'
import {fromJS,Map,List} from 'immutable'

const initialState = fromJS({
	token: cookie.load('token') || null,
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

// export function auth(state=initialState, action) {
// 	switch(action.type){
// 		case LOGIN_SUCCESS:
// 		return {
// 		  ...state,
// 		  errMsg: null,
// 		  token: action.token
// 		}
// 		case LOGIN_FAILURE:
// 		return {
// 		  ...state,
// 		  errMsg: action.errMsg
// 		}
// 		case USERINFO_SUCCESS:
// 		return {
// 			...state,
// 			errMsg:null,
// 			user: action.user
// 		}
// 		case USERINFO_FAILURE:
// 		return {
// 			...state,
// 			errMsg: null,
// 			user: null
// 		}
// 		case LOGOUT_USER:
// 		return { ...initialState,token:null }
// 		case UPDATE_USER_FAILURE:
// 		return {...state,errMsg:action.errMsg}
// 		case UPDATE_USER_SUCCESS:
// 		return {...state,user:action.user,errMsg:null}
// 		default: 
// 		return state
// 	}
// }
