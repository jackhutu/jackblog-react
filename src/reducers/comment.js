import {COMMENT_LIST,FAILURE_ADD_COMMENT,SUCCESS_ADD_COMMENT,FAILURE_ADD_REPLY,SUCCESS_ADD_REPLY} from '../actions/ActionTypes'
import { createReducer } from 'redux-immutablejs'
import {fromJS,Map,List} from 'immutable'

const initialState = fromJS({
	isFetching: false,
	errMsg: null,
	items: []
})
export default createReducer(initialState,{
	[COMMENT_LIST]: (state,action)=>{
		return state.merge({
			errMsg:null,
			items: fromJS(action.commentList)
		})
	},
	[SUCCESS_ADD_COMMENT]:(state,action)=>{
		return state.mergeDeep({
			errMsg:null,
			items: state.get('items').push(action.comment)
		})
	},
	[SUCCESS_ADD_REPLY]: (state,action)=>{
		return state.mergeDeep({
			errMsg: null,
			items: state.get('items').map(item=>{
				if(item.get('_id') === action.cid){
					return item.set('replys',action.replys)
				}
				return item
			})
		})
	},
	[FAILURE_ADD_COMMENT]:(state,action)=> state.set('errMsg',action.errMsg),
	[FAILURE_ADD_REPLY]: (state,action)=> state.set('errMsg',action.errMsg)
})
//export function commentList(initialState, action) {

	// switch(action.type){
	// 	case COMMENT_LIST:
	// 	return {...state,errMsg:null,items:action.commentList}
	// 	case SUCCESS_ADD_COMMENT:
	// 	return {...state,errMsg:null,items:[...state.items,action.comment]}
	// 	case SUCCESS_ADD_REPLY:
	// 		state.items.map(item=>{
	// 			if(item._id === action.cid){
	// 				item.replys = action.replys
	// 			}
	// 		})
	// 	return {...state, errMsg: null}
	// 	case FAILURE_ADD_COMMENT:
	// 	case FAILURE_ADD_REPLY:
	// 	return {...state,errMsg:action.errMsg}
	// 	default: 
	// 	return state
	// }
//}