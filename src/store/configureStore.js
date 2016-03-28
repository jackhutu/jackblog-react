import { createStore,compose,applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware, push } from 'react-router-redux'
import { Router, Route, browserHistory } from 'react-router'
import {persistState} from 'redux-devtools'
import createLogger from 'redux-logger'
import {Iterable} from 'immutable'
import promiseMiddleware from '../api/promiseMiddleware'
import DevTools from '../components/DevTools'
import rootReducer from '../reducers'

export default function configureStore(initialState, history) {
  const stateTransformer = (state) => {
    if (Iterable.isIterable(state)) return state.toJS()
    else return state
  }
  let middleware = [ thunkMiddleware, promiseMiddleware, routerMiddleware(history) ]
  let finalCreateStore
  if (__DEVCLIENT__) {
    middleware.push(
      createLogger({
        stateTransformer
      })
    )
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )
  } else {
    finalCreateStore = compose(applyMiddleware(...middleware))
  }

  const store = finalCreateStore(createStore)(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }
  return store
}
