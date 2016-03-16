import {COMMENT_LIST,SUCCESS_ADD_COMMENT,SUCCESS_ADD_REPLY} from '../actions/ActionTypes'
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
	}
})