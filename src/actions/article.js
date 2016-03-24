import * as types from './types'
import api from '../api'


//首页图片success
export const getIndexImage = () => {
	return {
		type: types.GET_INDEX_IMG,
		promise: api.getIndexImage()
	}
}
//获取标签列表.
export const getTagList = () =>{
	return {
		type: types.TAG_LIST,
		promise: api.getTagList()
	}
}
/*获取文章列表*/
export const getArticleList = (isAdd = true) =>{
	return (dispatch,getState) => {
		const options = getState().options.toJS()
		return {
			type: types.ARTICLE_LIST,
			itemsPerPage: options.itemsPerPage,
			promise: api.getArticleList(options),
			isAdd: isAdd
		}
		// api.getArticleList(options).then(response=>{
		// 	console.log(response);
		// })
	}
}
//初始文章列表
// function receiveArticleList(json,isMore) {
// 	return {
// 	  type: types.ARTICLE_LIST,
// 	  articleList: json.data,
// 	  isMore:isMore
// 	}
// }
// //加载更多文章
// function addArticleList(json,isMore) {
// 	return {
// 	  type: types.ADD_ARTICLE_LIST,
// 	  articleList: json.data,
// 	  isMore:isMore
// 	}
// }
// //发送请求
// function requestArticleList() {
//   return {
//     type: types.REQUEST_ARTICLE_LIST
//   }
// }
// export function getArticleList(isAdd = true) {
// 	return (dispatch,getState) => {
// 		dispatch(requestArticleList())
// 		const options = getState().options.toJS()
// 		return fetch(API_ROOT + 'article/getFrontArticleList?' + querystring.stringify(options))
// 		  .then(response => response.json())
// 		  .then(json => {
// 		  	const isMore = !(json.data.length < options.itemsPerPage)
// 		    return isAdd?dispatch(addArticleList(json,isMore)):dispatch(receiveArticleList(json,isMore))
// 		  })
// 	}
// }