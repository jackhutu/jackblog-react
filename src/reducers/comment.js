import {COMMENT_LIST,FAILURE_ADD_COMMENT,SUCCESS_ADD_COMMENT,FAILURE_ADD_REPLY,SUCCESS_ADD_REPLY} from '../actions/ActionTypes'

export function commentList(state={
	isFetching: false,
	errMsg: null,
	items: []
}, action) {
	switch(action.type){
		case COMMENT_LIST:
		return {...state,errMsg:null,items:action.commentList}
		case SUCCESS_ADD_COMMENT:
		return {...state,errMsg:null,items:[...state.items,action.comment]}
		case SUCCESS_ADD_REPLY:
			state.items.map(item=>{
				if(item._id === action.cid){
					item.replys = action.replys
				}
			})
		return {...state, errMsg: null}
		case FAILURE_ADD_COMMENT:
		case FAILURE_ADD_REPLY:
		return {...state,errMsg:action.errMsg}
		default: 
		return state
	}
}