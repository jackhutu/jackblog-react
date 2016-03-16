import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import routes from './routes'
import configureStore from './store/configureStore'
import Root from './containers/Root'
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'jackblog-sass/dist/index.css'
import 'react-s-alert/dist/s-alert-default.css'
import './assets/styles/index.css'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Root store={store} history={history} routes={routes()} />,
  document.getElementById('root')
)
