import {
	ARTICLE_LIST_REQUEST,
	ARTICLE_LIST_SUCCESS,
	ARTICLE_LIST_FAILURE,
	ARTICLE_DETAIL,
	PRENEXT_ARTICLE,
	TOGGLE_LIKE
} from '../actions/types'
import { createReducer } from 'redux-immutablejs'
import {fromJS,Map,List} from 'immutable'

const initialState = fromJS({
	isFetching: false,
	isMore: true,
	items: []
})

export const articleList = createReducer(initialState,{
	[ARTICLE_LIST_REQUEST]: (state,action)=>state.set('isFetching',true),
	[ARTICLE_LIST_SUCCESS]: (state,action)=>{
		return state.merge({
			isFetching:false,
			isMore: action.isMore,
			items: action.isAdd?state.get('items').concat(action.articleList):action.articleList
		})
	},
	[ADD_ARTICLE_LIST]: (state,action)=>{
		return state.merge({
		  isFetching: false,
		  isMore: action.isMore,
		  items: state.get('items').concat(action.articleList)
		})
	}

})

export const articleDetail = createReducer(fromJS({}),{
	[ARTICLE_DETAIL]:(state,action)=>state.merge(action.articleDetail),
	[TOGGLE_LIKE]:(state,action)=>{
		return state.merge({
			isLike:action.isLike, 
			like_count:action.like_count
		})
	}
})

export const prenextArticle = createReducer(fromJS({
	'next':{},'prev':{}
}),{
	[PRENEXT_ARTICLE]:(state,action)=>state.merge(action.prenextArticle)
})