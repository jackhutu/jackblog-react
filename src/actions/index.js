import * as types from './types'
import api from '../api'
import {API_ROOT} from '../config'
import querystring from 'querystring'
import {saveCookie,getCookie} from '../utils/authService'
import { showMsg } from './auth'

export * from './article'
export * from './other'




//获取文章详情
function receiveArticleDetail(article) {
	return {
		type: types.ARTICLE_DETAIL,
		articleDetail: article
	}
}
export function getArticleDetail(id) {
	return (dispatch, getState) => {
		const auth = getState().auth.toJS()
		return fetch(API_ROOT + 'article/' + id + '/getFrontArticle')
		  .then(response => response.json().then(json=>({json,response})))
		  .then(({json,response}) => {
		  	let isLike = false
		  	let article = json.data
		  	if(auth.user){
		  	  auth.user.likes.map(item=>{
		  	    if(item.toString() === article._id){
		  	      isLike = true
		  	    }
		  	  })
		  	}
		  	if(response.ok){
		  		return dispatch(receiveArticleDetail({
		  			...article,
		  			isLike:isLike
		  		}))
		  	}
		  })
	}
}
//获取评论
function receiveCommentList(json) {
	return {
		type: types.COMMENT_LIST,
		commentList: json.data
	}
}
export function getCommentList(id) {
	return (dispatch, getState) => {
		return fetch(API_ROOT + 'comment/' + id + '/getFrontCommentList')
		  .then(response => response.json())
		  .then(json => {
		    return dispatch(receiveCommentList(json))
		  })
	}
}
//获取上下一篇文章
function receivePrenext(json) {
	return {
		type: types.PRENEXT_ARTICLE,
		prenextArticle: json.data
	}
}

export function getPrenext(id) {
  return (dispatch,getState) => {
  	return fetch(API_ROOT + 'article/' + id + '/getPrenext')
  	  .then(response => response.json())
  	  .then(json => {
  	    return dispatch(receivePrenext(json))
  	  })
  }
}
//更改options
export function changeOptions(option) {
	return {
		type: types.CHANGE_OPTIONS,
		option: option
	}
}

//切换Like
function receiveToggleLike(json) {
	return {
		type: types.TOGGLE_LIKE,
		like_count: json.count,
		isLike: json.isLike
	}
}

export function toggleLike(aid) {
	return (dispatch,getState)=>{
		return fetch(API_ROOT + 'article/' + aid + '/toggleLike',{
			method: 'put',
			credentials: 'include',
			headers: {
			    'Authorization': `Bearer ${getCookie('token')}`
			}
		}).then(response => response.json().then(json => ({json,response})))
		.then(({json,response}) => {
			//{success:true,'count':blog.like_count,'isLike':liked}
			if(response.ok){
				return dispatch(receiveToggleLike(json))
			}
		})
	}
}
//添加评论
function receiveAddComment(comment) {
	return {
		type: types.SUCCESS_ADD_COMMENT,
		comment: comment
	}
}

export function addComment(comment) {
	return (dispatch,getState)=>{
		return fetch(API_ROOT + 'comment/addNewComment',{
			method: 'post',
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			  'Authorization': `Bearer ${getCookie('token')}`
			},
			body: JSON.stringify(comment)
		}).then(response => response.json().then(json => ({json,response})))
		.then(({json,response}) => {
			if(!response.ok){
				return dispatch(showMsg(json.error_msg || '添加评论失败'))
			}
			dispatch(showMsg('添加评论成功','success'))
			return dispatch(receiveAddComment(json.data))
		}).catch(e=>{
			return dispatch(showMsg(e.error_msg || '添加评论失败'))
		})
	}
}

//添加回复
function receiveAddReply(cid,replys) {
	return {
		type: types.SUCCESS_ADD_REPLY,
		cid:cid,
		replys: replys
	}
}

export function addReply(cid,reply) {
	return (dispatch,getState)=>{
		return fetch(API_ROOT + 'comment/' + cid + '/addNewReply',{
			method: 'post',
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			  'Authorization': `Bearer ${getCookie('token')}`
			},
			body: JSON.stringify(reply)
		}).then(response => response.json().then(json => ({json,response})))
		.then(({json,response}) => {
			if(!response.ok){
				return dispatch(showMsg(json.error_msg || '添加回复失败'))
			}
			dispatch(showMsg('添加回复成功','success'))
			return dispatch(receiveAddReply(cid,json.data))
		}).catch(e=>{
			return dispatch(showMsg(e.error_msg || '添加回复失败'))
		})
	}
}

//获取apps
export const getApps = () =>{
	return {
		type: types.GET_APPS,
		promise: api.getApps()
	}
}
// function receiveApps(apps) {
// 	return {
// 		type: types.SUCCESS_GET_APPS,
// 		apps:apps
// 	}
// }
// function failureGetApps() {
// 	return {
// 		type: types.FAILURE_GET_APPS,
// 	}
// }
// export function getApps() {
// 	return (dispatch,getState)=>{
// 		return api.getApps()
// 		.then(response => ({json: response.data, status: response.statusText}))
// 		.then(({json,status}) => {
// 			if(status !== 'OK'){
// 				return dispatch(failureGetApps())
// 			}
// 			return dispatch(receiveApps(json.data))
// 		}).catch(e=>{
// 			return dispatch(failureGetApps())
// 		})
// 	}
// }

