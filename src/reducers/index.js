import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import {fromJS,Map,List} from 'immutable'
import { createReducer } from 'redux-immutablejs'
import {CHANGE_STYLE_MODE,GET_INDEX_IMG,GET_CAPTCHAURL} from '../actions/ActionTypes'
import tagList from './tag'
import {articleList, articleDetail,prenextArticle} from './article'
import commentList from './comment'
import auth from './auth'
import options from './options'
import {API_ROOT} from '../config'

const globalVal =  createReducer(fromJS({
	indexImg:'',styleMode:'day-mode',
	captchaUrl: API_ROOT + 'users/getCaptcha?'
}), {
	[CHANGE_STYLE_MODE]: (state, action) => state.set('styleMode',(state.get('styleMode') === 'day-mode')?'night-mode':'day-mode'),
  [GET_INDEX_IMG]: (state, action) => state.set('indexImg',action.indexImg),
  [GET_CAPTCHAURL]: (state, action) => state.set('captchaUrl',action.captchaUrl)
})

const rootReducer = combineReducers({
	globalVal,
	tagList,
	articleList,
	articleDetail,
	commentList,
	prenextArticle,
	options,
	auth,
	routing: routeReducer
})

export default rootReducer
