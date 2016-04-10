import {
  ARTICLE_LIST_REQUEST,
  ARTICLE_LIST_SUCCESS,
  ARTICLE_LIST_FAILURE,
  ARTICLE_DETAIL_SUCCESS,
  ARTICLE_DETAIL_FAILURE,
  PRENEXT_ARTICLE_SUCCESS,
  PRENEXT_ARTICLE_FAILURE,
  TOGGLE_LIKE_SUCCESS,
  TOGGLE_LIKE_FAILURE
} from '../actions/types'
import { createReducer } from 'redux-immutablejs'
import {fromJS} from 'immutable'

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
      isMore: !(action.json.data.length < action.itemsPerPage),
      items: action.isAdd?state.get('items').concat(action.json.data):action.json.data
    })
  },
  [ARTICLE_LIST_FAILURE]: (state,action)=>state.set('isFetching',false)
})

export const articleDetail = createReducer(fromJS({}),{
  [ARTICLE_DETAIL_SUCCESS]:(state,action)=>state.merge(action.articleDetail),
  [ARTICLE_DETAIL_FAILURE]:(state,action)=>state,
  [TOGGLE_LIKE_SUCCESS]:(state,action)=>{
    return state.merge({
      isLike:action.isLike, 
      like_count:action.like_count
    })
  },
  [TOGGLE_LIKE_FAILURE]:(state,action)=>state
})

export const prenextArticle = createReducer(fromJS({
  'next':{},'prev':{}
}),{
  [PRENEXT_ARTICLE_SUCCESS]:(state,{json})=>{
    return state.merge(json.data)
  },
  [PRENEXT_ARTICLE_FAILURE]:(state,{json})=>state
})