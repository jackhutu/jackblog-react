import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import Root from './containers/Root'

import 'font-awesome/css/font-awesome.css'
import './assets/styles/index.scss'


const store = configureStore()

render(
  <Root store={store} />,
  document.getElementById('root')
)
