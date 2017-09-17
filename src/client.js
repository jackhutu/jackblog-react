import React from 'react'
import { render } from 'react-dom'
import { renderRoutes } from 'react-router-config'
import { browserHistory, BrowserRouter } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import {Provider} from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import configureStore from './store/configureStore'
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'jackblog-sass/dist/index.css'
import 'react-s-alert/dist/s-alert-default.css'
import 'assets/styles/index.css'
import createDevTools from './createDevtools'
import routes from './routes'

const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState,browserHistory)
const history = createHistory()
createDevTools(store)

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)