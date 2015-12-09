import { createStore,compose,applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import thunkMiddleware from 'redux-thunk'
//加路由,路由需要一个中间件,和组件,以及reducer
import {reduxReactRouter} from 'redux-router'
import createHistory from 'history/lib/createBrowserHistory'

const finalCreateStore = compose(
  applyMiddleware(thunkMiddleware),
  reduxReactRouter({ createHistory })
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState)
}
