import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router'
import {CHANGE_STYLE_MODE,GET_INDEX_IMG,CHANGE_OPTIONS,GET_CAPTCHAURL} from '../actions/ActionTypes'
import tagList from './tag'
import {articleList, articleDetail,prenextArticle} from './article'
import {commentList} from './comment'
import {auth,captchaUrl} from './auth'

function styleMode(state = "day-mode", action) {
	switch(action.type){
		case CHANGE_STYLE_MODE:
			return (state === 'day-mode')?'night-mode':'day-mode'
		default: 
			return state
	}
}

function indexImg(state = "", action) {
	switch(action.type){
		case GET_INDEX_IMG:
			return action.indexImg
		default: 
			return state
	}
}
function options(state = {currentPage: 1, itemsPerPage: 8,sortName:'publish_time',tagId: ''}, action) {
	switch(action.type){
		case CHANGE_OPTIONS:
		return Object.assign({},state,action.option)
		default: 
		return state
	}
}




const rootReducer = combineReducers({
	indexImg,
	styleMode,
	tagList,
	articleList,
	articleDetail,
	commentList,
	prenextArticle,
	options,
	captchaUrl,
	auth,
  router: routerStateReducer
})

export default rootReducer
