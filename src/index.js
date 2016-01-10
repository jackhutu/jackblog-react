import 'babel-core/register'
import React from 'react'
import { render } from 'react-dom'
//import { createHistory } from 'history'
import createHistory from 'history/lib/createBrowserHistory'
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'
import routes from './routes'
import configureStore from './store/configureStore'
import Root from './containers/Root'
import 'font-awesome/css/font-awesome.css'
import './assets/styles/index.scss'

const store = configureStore()
const history = createHistory()
syncReduxAndRouter(history, store)

render(
  <Root store={store} history={history} routes={routes()} />,
  document.getElementById('root')
)
