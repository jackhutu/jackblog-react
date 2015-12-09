import { combineReducers } from 'redux'
//import { routerStateReducer } from 'redux-router'
import {TAG_LIST} from '../constants/ActionTypes'

export default function tagList(state=[], action) {
	switch(action.type){
		case TAG_LIST:
		return action.tagList
		default: 
		return state
	}
}

// const tagReducer = combineReducers({
// 	tagList
// })

// export default tagReducer