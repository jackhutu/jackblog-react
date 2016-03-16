import * as types from './ActionTypes'
import fetch from 'isomorphic-fetch'
import {API_ROOT} from '../config'
import img from '../assets/images/shanghai.jpg'
import querystring from 'querystring'
import {saveCookie,getCookie} from '../utils/authService'
import { showMsg } from './auth'

//改变样式风格.
export function changeStyleMode(text) {
  return { type: types.CHANGE_STYLE_MODE }
}
//首页图片success
function receiveIndexImage(json) {
	return {
	  type: types.GET_INDEX_IMG,
	  indexImg: json.img
	}
}
//Failure
function failureIndexImage() {
	return {
	  type: types.GET_INDEX_IMG,
	  indexImg: img
	}
}

function fetchIndexImage(){
  return dispatch => {
    return fetch(API_ROOT + 'article/getIndexImage')
      .then(response => response.json())
      .then(json => {
        return dispatch(receiveIndexImage(json))
      })
      .catch(error => {
      	return dispatch(failureIndexImage())
      })
  }
}

export function getIndexImage() {
	return (dispatch, getState) => {
		return dispatch(fetchIndexImage())
	}
}

//获取标签列表.
function receiveTagList(json) {
	return {
	  type: types.TAG_LIST,
	  tagList: json.data
	}
}
export function getTagList() {
	return (dispatch, getState) => {
		return fetch(API_ROOT + 'tags/getFrontTagList')
		  .then(response => response.json())
		  .then(json => {
		    return dispatch(receiveTagList(json))
		  })
	}
}

/*获取文章列表*/
//初始文章列表
function receiveArticleList(json,isMore) {
	return {
	  type: types.ARTICLE_LIST,
	  articleList: json.data,
	  isMore:isMore
	}
}
//加载更多文章
function addArticleList(json,isMore) {
	return {
	  type: types.ADD_ARTICLE_LIST,
	  articleList: json.data,
	  isMore:isMore
	}
}
//发送请求
function requestArticleList() {
  return {
    type: types.REQUEST_ARTICLE_LIST
  }
}
export function getArticleList(isAdd = true) {
	return (dispatch,getState) => {
		dispatch(requestArticleList())
		const options = getState().options.toJS()
		return fetch(API_ROOT + 'article/getFrontArticleList?' + querystring.stringify(options))
		  .then(response => response.json())
		  .then(json => {
		  	const isMore = !(json.data.length < options.itemsPerPage)
		    return isAdd?dispatch(addArticleList(json,isMore)):dispatch(receiveArticleList(json,isMore))
		  })
	}
}
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
function receiveApps(apps) {
	return {
		type: types.SUCCESS_GET_APPS,
		apps:apps
	}
}
function failureGetApps() {
	return {
		type: types.FAILURE_GET_APPS,
	}
}
export function getApps() {
	return (dispatch,getState)=>{
		return fetch(API_ROOT + 'mobile/getApps')
		.then(response => response.json().then(json => ({json,response})))
		.then(({json,response}) => {
			if(!response.ok){
				return dispatch(failureGetApps())
			}
			return dispatch(receiveApps(json.data))
		}).catch(e=>{
			return dispatch(failureGetApps())
		})
	}
}

