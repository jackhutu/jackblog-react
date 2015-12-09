import { combineReducers } from 'redux'
import {ARTICLE_LIST} from '../constants/ActionTypes'

export default function articleList(state=[], action) {
	switch(action.type){
		case ARTICLE_LIST:
		return action.articleList
		default: 
		return state
	}
}