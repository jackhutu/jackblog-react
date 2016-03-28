import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import {Provider} from 'react-redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import routes from './routes'
import configureStore from './store/configureStore'
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'jackblog-sass/dist/index.css'
import 'react-s-alert/dist/s-alert-default.css'
import './assets/styles/index.css'

const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState,browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

function isDevTools() {
	if(__DEVCLIENT__ && !window.devToolsExtension){
		return <DevTools />
	}
	return null
}

render(
  <Provider store={store}>
    <Router history={history}>
    	{routes()}
    </Router>
  </Provider>,
  document.getElementById('root')
)