import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { articleList, articleDetail,prenextArticle } from './article'
import tagList from './tagList'
import commentList from './comment'
import auth from './auth'
import options from './options'
import apps from './apps'
import sns from './sns'
import showmsg from './showmsg'
import globalVal from './globalVal'

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
