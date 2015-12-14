import {COMMENT_LIST} from '../actions/ActionTypes'

export function commentList(state=[], action) {
	switch(action.type){
		case COMMENT_LIST:
		return action.commentList
		default: 
		return state
	}
}