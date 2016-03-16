import { createStore,compose,applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware, push } from 'react-router-redux'
import { Router, Route, browserHistory } from 'react-router'
import {persistState} from 'redux-devtools'
import DevTools from '../containers/DevTools'
import rootReducer from '../reducers'
//使用chrome 扩展来做调试工具.
// window.devToolsExtension ? window.devToolsExtension() : f => f

let finalCreateStore
const middleware = applyMiddleware(routerMiddleware(browserHistory),thunkMiddleware)
if(process.env.NODE_ENV === 'production'){
  finalCreateStore = compose(middleware)
}else{
  finalCreateStore = compose(
    middleware,
    DevTools.instrument(),
    persistState(
      window.location.href.match(
        /[?&]debug_session=([^&]+)\b/
      )
    )
  )
}

export default function configureStore(initialState) {
  const store = finalCreateStore(createStore)(rootReducer, initialState)
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }
  return store
}
