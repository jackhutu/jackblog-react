import {TAG_LIST} from '../actions/ActionTypes'

export default function tagList(state=[], action) {
	switch(action.type){
		case TAG_LIST:
		return action.tagList
		default: 
		return state
	}
}