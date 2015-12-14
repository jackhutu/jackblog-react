import {ARTICLE_LIST,ARTICLE_DETAIL,PRENEXT_ARTICLE,ADD_ARTICLE_LIST,REQUEST_ARTICLE_LIST} from '../actions/ActionTypes'

export function articleList(state={
	isFetching: false,
	isMore: true,
	items: []
}, action) {
	switch(action.type){
		case REQUEST_ARTICLE_LIST:
		return Object.assign({},state,{isFetching:true})
		case ARTICLE_LIST:
		return Object.assign({},{
			isFetching: false,
			isMore: action.isMore,
			items:action.articleList
		})
		case ADD_ARTICLE_LIST:
		return Object.assign({},{
		  isFetching: false,
		  isMore: action.isMore,
		  items: [...state.items,...action.articleList]
		})
		default: 
		return state
	}
}

export function articleDetail(state={}, action) {
	switch(action.type){
		case ARTICLE_DETAIL:
		return Object.assign({},action.articleDetail)
		default:
		return state
	}
}

export function prenextArticle(state={'next':{},'prev':{}}, action) {
	switch(action.type){
		case PRENEXT_ARTICLE:
		return Object.assign({},action.prenextArticle)
		default:
		return state
	}
}