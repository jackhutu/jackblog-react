import { combineReducers } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { fromJS,Map,List } from 'immutable'
import { createReducer } from 'redux-immutablejs'
import {reducer as formReducer} from 'redux-form'
import {API_ROOT} from '../config'
import {CHANGE_STYLE_MODE,GET_INDEX_IMG,GET_CAPTCHAURL} from '../actions/ActionTypes'
import {articleList, articleDetail,prenextArticle} from './article'
import tagList from './tag'
import commentList from './comment'
import auth from './auth'
import options from './options'
import apps from './apps'
import sns from './sns'
import showmsg from './showmsg'

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
	apps,
	sns,
	tagList,
	articleList,
	articleDetail,
	commentList,
	prenextArticle,
	options,
	auth,
	showmsg,
	routing: routerReducer,
	form: formReducer
})

export default rootReducer
