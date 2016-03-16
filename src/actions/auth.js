import * as types from './ActionTypes'
import {API_ROOT} from '../config'
import fetch from 'isomorphic-fetch'
import { push } from 'react-router-redux'
import {saveCookie,getCookie,signOut} from '../utils/authService'

export function showMsg (content,type='error'){
	return {
		type: types.SHOW_MSG,
		message: { content:content,type:type }
	}
}

export function hideMsg () {
	return {
		type: types.HIDE_MSG
	}
}

//登录
function loginSuccess(token) {
	return {
		type: types.LOGIN_SUCCESS,
		token: token
	}
}

export function localLogin(userInfo) {
	return (dispatch,getState) =>{
		return fetch(API_ROOT + 'auth/local',{
			method: 'post',
			credentials: 'include',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(userInfo)
		}).then(response => response.json().then(json => ({ json, response })))
		  .then(({json,response}) => {
		  	if(!response.ok){
		  		dispatch(getCaptchaUrl())
		  		return dispatch(showMsg(json.error_msg || '登录失败'))
		  	}
		  	//得到token,并存储
		  	saveCookie('token',json.token)
		  	//获取用户信息
		  	dispatch(getUserInfo(json.token))
		  	dispatch(loginSuccess(json.token))
		  	dispatch(showMsg('登录成功,欢迎光临!','success'))
		  	dispatch(push('/'))
		  }).catch( err =>{
		  	//登录异常
		  	dispatch(getCaptchaUrl())
		  	return dispatch(showMsg(err.error_msg || '登录失败'))
		  })
	}

}

//获取验证码
export function getCaptchaUrl() {
	return {
		type: types.GET_CAPTCHAURL,
		captchaUrl: API_ROOT + 'users/getCaptcha?' + Math.random()
	}
}

//获取用户信息
function receiveUserInfo(user) {
	return {
		type: types.USERINFO_SUCCESS,
		user: user
	}
}
function failureUserInfo() {
	return {
		type: types.USERINFO_FAILURE
	}
}
export function getUserInfo(token) {
  return (dispatch, getState) => {
    return fetch(API_ROOT + 'users/me', {
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => response.json().then(json => ({ json, response })))
				  .then(({json,response}) => {
				  	if(!response.ok){
				  		return dispatch(failureUserInfo())
				  	}
				  	return dispatch(receiveUserInfo(json))
				  }).catch( err =>{
				  	//登录异常
				  	return dispatch(failureUserInfo())
				  })
   }
}

export function logout() {
  return dispatch => {
  	signOut()
    dispatch({type: types.LOGOUT_USER})
    dispatch(push('/'))
  }
}
//修改用户资料
function successUpdateUser(user) {
	return {
		type: types.UPDATE_USER_SUCCESS,
		user:user
	}
}
export function updateUser(userInfo) {
	return (dispatch,getState)=>{
		return fetch(API_ROOT + 'users/mdUser',{
			method: 'put',
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			  'Authorization': `Bearer ${getCookie('token')}`
			},
			body: JSON.stringify(userInfo)
		}).then(response => response.json().then(json => ({json,response})))
		.then(({json,response}) => {
			if(!response.ok){
				return dispatch(showMsg(json.error_msg || '更新用户资料失败'))
			}
			dispatch(showMsg('更新用户资料成功','success'))
			return dispatch(successUpdateUser(json.data))
		}).catch(err=>{
			return dispatch(showMsg(err.error_msg || '更新用户资料失败'))
		})
	}
}


//获取sns
function receiveSnsLogins(logins) {
	return {
		type: types.SUCCESS_GET_SNSLOGINS,
		logins:logins
	}
}
function failureSnsLogins() {
	return {
		type: types.FAILURE_GET_SNSLOGINS,
	}
}
export function getSnsLogins() {
	return (dispatch,getState)=>{
		return fetch(API_ROOT + 'users/snsLogins')
		.then(response => response.json().then(json => ({json,response})))
		.then(({json,response}) => {
			if(!response.ok){
				return dispatch(failureSnsLogins())
			}
			return dispatch(receiveSnsLogins(json.data))
		}).catch(e=>{
			return dispatch(failureSnsLogins())
		})
	}
}