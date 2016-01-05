import {CHANGE_STYLE_MODE,GET_INDEX_IMG,TAG_LIST,ARTICLE_LIST,ARTICLE_DETAIL,COMMENT_LIST,PRENEXT_ARTICLE, CHANGE_OPTIONS,ADD_ARTICLE_LIST,REQUEST_ARTICLE_LIST,GET_CAPTCHAURL,TOGGLE_LIKE,FAILURE_ADD_COMMENT,SUCCESS_ADD_COMMENT,FAILURE_ADD_REPLY,SUCCESS_ADD_REPLY} from './ActionTypes'
import fetch from 'isomorphic-fetch'
import {API_ROOT} from '../config'
import img from '../assets/images/shanghai.jpg'
import querystring from 'querystring'
import cookie from 'react-cookie'

//改变样式风格.
export function changeStyleMode(text) {
  return { type: CHANGE_STYLE_MODE }
}
//首页图片.
//success
function receiveIndexImage(json) {
	return {
	  type: GET_INDEX_IMG,
	  indexImg: json.img
	}
}
//Failure
function failureIndexImage() {
	return {
	  type: GET_INDEX_IMG,
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
	  type: TAG_LIST,
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
	  type: ARTICLE_LIST,
	  articleList: json.data,
	  isMore:isMore
	}
}
//加载更多文章
function addArticleList(json,isMore) {
	return {
	  type: ADD_ARTICLE_LIST,
	  articleList: json.data,
	  isMore:isMore
	}
}
//发送请求
function requestArticleList() {
  return {
    type: REQUEST_ARTICLE_LIST
  }
}
export function getArticleList(isAdd = true) {
	return (dispatch,getState) => {
		dispatch(requestArticleList())
		const options = getState().options
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
		type: ARTICLE_DETAIL,
		articleDetail: article
	}
}
export function getArticleDetail(id) {
	return (dispatch, getState) => {
		const {auth} = getState()
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
		type: COMMENT_LIST,
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
		type: PRENEXT_ARTICLE,
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
		type: CHANGE_OPTIONS,
		option: option
	}
}

//切换Like
function receiveToggleLike(json) {
	return {
		type: TOGGLE_LIKE,
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
			    'Authorization': `Bearer ${cookie.load('token')}`
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
		type: SUCCESS_ADD_COMMENT,
		comment: comment
	}
}
function failureAddComment(err) {
	return {
		type: FAILURE_ADD_COMMENT,
		errMsg: err.error_msg || '添加评论失败'
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
			  'Authorization': `Bearer ${cookie.load('token')}`
			},
			body: JSON.stringify(comment)
		}).then(response => response.json().then(json => ({json,response})))
		.then(({json,response}) => {
			if(!response.ok){
				return dispatch(failureAddComment(json))
			}
			return dispatch(receiveAddComment(json.data))
		}).catch(e=>{
			return dispatch(failureAddComment(e))
		})
	}
}

//添加回复
function receiveAddReply(cid,replys) {
	return {
		type: SUCCESS_ADD_REPLY,
		cid:cid,
		replys: replys
	}
}
function failureAddReply(err) {
	return {
		type: FAILURE_ADD_REPLY,
		errMsg: err.error_msg || '添加回复失败'
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
			  'Authorization': `Bearer ${cookie.load('token')}`
			},
			body: JSON.stringify(reply)
		}).then(response => response.json().then(json => ({json,response})))
		.then(({json,response}) => {
			if(!response.ok){
				return dispatch(failureAddReply(json))
			}
			return dispatch(receiveAddReply(cid,json.data))
		}).catch(e=>{
			return dispatch(failureAddReply(e))
		})
	}
}
