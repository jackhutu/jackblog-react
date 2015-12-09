import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router'
import {CHANGE_STYLE_MODE,GET_INDEX_IMG} from '../constants/ActionTypes'
import tagList from './tag'
import articleList from './article'

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

const rootReducer = combineReducers({
	indexImg,
	styleMode,
	tagList,
	articleList,
  router: routerStateReducer
})

export default rootReducer
