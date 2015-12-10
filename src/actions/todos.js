import {CHANGE_STYLE_MODE,GET_INDEX_IMG,TAG_LIST,ARTICLE_LIST,ARTICLE_DETAIL} from '../constants/ActionTypes'
import fetch from 'isomorphic-fetch'
const API_ROOT = 'http://localhost:9000/api/'
import img from '../assets/images/shanghai.jpg'

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
	  indexImg: img//'../assets/images/shanghai.jpg'
	}
}

function fetchIndexImage(){
  return dispatch => {
    return fetch('http://localhost:9000/api/blog/getIndexImage')
      .then(response => response.json())
      .then(json => {
        return dispatch(receiveIndexImage(json))
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
function fetchTagList(){
  return dispatch => {
    return fetch('http://localhost:9000/api/tags/getFrontTagList')
      .then(response => response.json())
      .then(json => {
        return dispatch(receiveTagList(json))
      })
  }
}
export function getTagList() {
	return (dispatch, getState) => {
		return dispatch(fetchTagList())
	}
}

//获取文章列表
function receiveArticleList(json) {
	return {
	  type: ARTICLE_LIST,
	  articleList: json.data
	}
}
function fetchArticleList(){
  return dispatch => {
    return fetch('http://localhost:9000/api/blog/getFrontBlogList')
      .then(response => response.json())
      .then(json => {
        return dispatch(receiveArticleList(json))
      })
  }
}
export function getArticleList() {
	return (dispatch, getState) => {
		return dispatch(fetchArticleList())
	}
}
//获取文章详情
export function getArticleDetail() {
	return {
		type: ARTICLE_DETAIL
	}
}
