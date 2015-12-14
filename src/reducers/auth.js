import {LOGIN_SUCCESS,LOGIN_FAILURE,GET_CAPTCHAURL,USERINFO_SUCCESS,LOGOUT_USER,USERINFO_FAILURE} from '../actions/ActionTypes'
const API_ROOT = 'http://localhost:9000/api/'
import cookie from 'react-cookie'

const initialState = {
	token: cookie.load('token') || null,
	user: null,
	errMsg:null
}

export function auth(state=initialState, action) {
	switch(action.type){
		case LOGIN_SUCCESS:
		return {
		  ...state,
		  errMsg: null,
		  token: action.token
		}
		case LOGIN_FAILURE:
		return {
		  ...state,
		  errMsg: action.errMsg
		}
		case USERINFO_SUCCESS:
		return {
			...state,
			errMsg:null,
			user: action.user
		}
		case USERINFO_FAILURE:
		return {
			...state,
			errMsg: null,
			user: null
		}
		case LOGOUT_USER:
		return { ...initialState,token:null }
		default: 
		return state
	}
}

export function captchaUrl(state = API_ROOT + 'users/getCaptcha?',action ) {
	switch(action.type){
		case GET_CAPTCHAURL:
		return action.captchaUrl
		default:
		return state
	}
}