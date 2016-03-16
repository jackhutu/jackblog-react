import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'
import Home from './containers/Home'
import Main from './components/main'
import Article from './components/article'
import Login from './components/login'
import Settings from './components/settings'
import MobileApps from './components/apps'
import {redirectToBack,redirectToLogin} from './utils/authService'


export default ()=> (
	<Route path="/" component={Home}>
		<IndexRoute component={Main}/>
		<Article path="/article/:id" component={Article} />
		<Login path="/login" component={Login} onEnter={redirectToBack} />
		<Settings path="/settings" component={Settings} onEnter={redirectToLogin} />
		<MobileApps path="/apps" component={MobileApps} />
	</Route>
)