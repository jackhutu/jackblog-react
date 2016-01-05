import { createStore,compose,applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import thunkMiddleware from 'redux-thunk'

import {reduxReactRouter} from 'redux-router'
import createHistory from 'history/lib/createBrowserHistory'
//开发调试工具.
import {persistState} from 'redux-devtools'
import DevTools from '../containers/DevTools'
//使用chrome 扩展来做调试工具.
// window.devToolsExtension ? window.devToolsExtension() : f => f
const finalCreateStore = compose(
  applyMiddleware(thunkMiddleware),
  reduxReactRouter({ createHistory }),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&]+)\b/
    )
  )
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
