import { createStore,compose } from 'redux'
import rootReducer from '../reducers'
import {persistState} from 'redux-devtools'
import DevTools from '../containers/DevTools'
//加路由,路由需要一个中间件,和组件,以及reducer
import {reduxReactRouter} from 'redux-router'
import createHistory from 'history/lib/createBrowserHistory'

const finalCreateStore = compose(
  //reduxReactRoute({ routes, createBrowserHistory}),
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
