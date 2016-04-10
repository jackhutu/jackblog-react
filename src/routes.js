import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import Home from './components/Home'
import Article from './components/Article'
import Login from './components/Login'
import Settings from './components/Settings'
import MobileApps from './components/MobileApps'
import {redirectToBack,redirectToLogin} from './utils/authService'

export default ()=> (
	<Route path="/" component={App}>
		<IndexRoute component={Home}/>
		<Article path="/article/:id" component={Article} />
		<Login path="/login" component={Login} onEnter={redirectToBack} />
		<Settings path="/settings" component={Settings} onEnter={redirectToLogin} />
		<MobileApps path="/apps" component={MobileApps} />
	</Route>
)