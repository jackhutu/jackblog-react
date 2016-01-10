import { createStore,compose,applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import thunkMiddleware from 'redux-thunk'
import {persistState} from 'redux-devtools'
import DevTools from '../containers/DevTools'
//使用chrome 扩展来做调试工具.
// window.devToolsExtension ? window.devToolsExtension() : f => f

let finalCreateStore
const middleware = applyMiddleware(thunkMiddleware)
if(process.env.NODE_ENV === 'production'){
  finalCreateStore = compose(
    middleware
  )
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


// const finalCreateStore = compose(
//   applyMiddleware(thunkMiddleware),
//   DevTools.instrument(),
//   persistState(
//     window.location.href.match(
//       /[?&]debug_session=([^&]+)\b/
//     )
//   )
// )(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(createStore)(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
