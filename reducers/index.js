import { combineReducers } from 'redux'
import todos from './todos'
import {routerStateReducer} from 'redux-router'

const rootReducer = combineReducers({
  todos,
  router: routerStateReducer
})

export default rootReducer
