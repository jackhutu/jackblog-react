import * as types from './types'
import api from '../api'
import { getUserInfo } from './auth'

//获取标签列表.
export const getTagList = () =>{
  return {
    type: types.TAG_LIST,
    promise: api.getTagList()
  }
}
//更改options
export const changeOptions = (option) => ({ type: types.CHANGE_OPTIONS, option: option})

//切换Like
function receiveToggleLike(json) {
  return {
    type: types.TOGGLE_LIKE_SUCCESS,
    like_count: json.count,
    isLike: json.isLike
  }
}

export function toggleLike(aid) {
  return (dispatch,getState)=>{
    return api.toggleLike(aid)
    .then(response => ({json: response.data, status: response.statusText}))
    .then(({json,status}) => {
      if(status !== 'OK'){
        return dispatch({ type: types.TOGGLE_LIKE_FAILURE })
      }
      dispatch(getUserInfo())
      return dispatch(receiveToggleLike(json))
    })
    .catch(error => {
      return dispatch({ type: types.TOGGLE_LIKE_FAILURE })
    })
  }
}

/*获取文章列表*/
export const getArticleList = (isAdd = true) =>{
  return (dispatch,getState) => {
    const options = getState().options.toJS()
    return dispatch({
      type: types.ARTICLE_LIST,
      itemsPerPage: options.itemsPerPage,
      promise: api.getArticleList(options),
      isAdd: isAdd
    })
  }
}
//获取文章详情
export const getArticleDetail = (id) =>{
  return (dispatch, getState) => {
    const auth = getState().auth.toJS()
    return api.getArticleDetaile(id)
    .then(response => ({json: response.data, status: response.statusText}))
    .then(({json,status}) => {
      let isLike = false
      let article = json.data
      if(auth.user){
        auth.user.likes.map(item=>{
          if(item.toString() === article._id){
            isLike = true
          }
        })
      }
      return dispatch({
        type: types.ARTICLE_DETAIL_SUCCESS,
        articleDetail: {...article,isLike:isLike}
      })
    })
    .catch(error => {
      return dispatch({
        type: types.ARTICLE_DETAIL_FAILURE
      })
    })
  }
}

//获取上下一篇文章
export const getPrenext = (id)=>{
  return (dispatch,getState) => {
    const options = getState().options.toJS()
    return dispatch({
      type: types.PRENEXT_ARTICLE,
      promise: api.getPrenext(id,options)
    })
  }
}