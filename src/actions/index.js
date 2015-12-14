import {CHANGE_STYLE_MODE,GET_INDEX_IMG,TAG_LIST,ARTICLE_LIST,ARTICLE_DETAIL,COMMENT_LIST,PRENEXT_ARTICLE, CHANGE_OPTIONS,ADD_ARTICLE_LIST,REQUEST_ARTICLE_LIST,GET_CAPTCHAURL} from './ActionTypes'
import fetch from 'isomorphic-fetch'
const API_ROOT = 'http://localhost:9000/api/'
import img from '../assets/images/shanghai.jpg'
import querystring from 'querystring'

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
    return fetch(API_ROOT + 'blog/getIndexImage')
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
export function getArticleList(isAdd = false) {
	return (dispatch,getState) => {
		dispatch(requestArticleList())
		const options = getState().options
		return fetch(API_ROOT + 'blog/getFrontBlogList?' + querystring.stringify(options))
		  .then(response => response.json())
		  .then(json => {
		  	const isMore = !(json.data.length < options.itemsPerPage)
		    return isAdd?dispatch(addArticleList(json,isMore)):dispatch(receiveArticleList(json,isMore))
		  })
	}
}
//获取文章详情
function receiveArticleDetail(json) {
	return {
		type: ARTICLE_DETAIL,
		articleDetail: json.data
	}
}
export function getArticleDetail(id) {
	return (dispatch, getState) => {
		return fetch(API_ROOT + 'blog/' + id + '/getFrontArticle')
		  .then(response => response.json())
		  .then(json => {
		    return dispatch(receiveArticleDetail(json))
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
  	return fetch(API_ROOT + 'blog/' + id + '/getPrenext')
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




//获取是否喜欢过

// export function getIsLike(arguments) {
	
// }
