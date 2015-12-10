import { combineReducers } from 'redux'
import {ARTICLE_LIST,ARTICLE_DETAIL} from '../constants/ActionTypes'

export function articleList(state=[], action) {
	switch(action.type){
		case ARTICLE_LIST:
		return action.articleList
		default: 
		return state
	}
}

export function articleDetail(state=[{},{}], action) {
	switch(action.type){
		case ARTICLE_DETAIL:
		return state
		default:
		return state
	}
}