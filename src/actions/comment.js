import * as types from './types'
import api from '../api'
import { showMsg } from './other'

//获取评论
export const getCommentList = (id)=>{
  return {
    type: types.COMMENT_LIST,
    promise: api.getCommentList(id)
  }
}
//添加评论
function receiveAddComment(comment) {
  return {
    type: types.ADD_COMMENT_SUCCESS,
    comment: comment
  }
}

export function addComment(comment) {
  return (dispatch,getState)=>{
    return api.addNewComment(comment)
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json,status}) => {
        if(status !== 'OK'){
          return dispatch(showMsg(json.data.error_msg || '添加评论失败'))
        }
        dispatch(showMsg('添加评论成功','success'))
        return dispatch(receiveAddComment(json.data))
      }).catch(err =>{
        return dispatch(showMsg(err.response.data.error_msg || '添加评论失败'))
      })
  }
}

//添加回复
function receiveAddReply(cid,replys) {
  return {
    type: types.ADD_REPLY_SUCCESS,
    cid:cid,
    replys: replys
  }
}

export function addReply(cid,reply) {
  return (dispatch,getState)=>{
    return api.addNewReply(cid,reply)
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json,status}) => {
        if(status !== 'OK'){
          return dispatch(showMsg(json.data.error_msg || '添加回复失败'))
        }
        dispatch(showMsg('添加回复成功','success'))
        return dispatch(receiveAddReply(cid,json.data))
      }).catch(err =>{
        return dispatch(showMsg(err.response.data.error_msg || '添加回复失败'))
      })
  }
}