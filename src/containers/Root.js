import React,{Component} from 'react'
import DevTools from './DevTools'
import {Provider} from 'react-redux'
import { Router,Route,IndexRoute} from 'react-router'
import Home from './Home'
import Main from '../components/main'
import Article from '../components/article'
import Login from '../components/login'
import Settings from '../components/settings'
import MobileApps from '../components/apps'
import {redirectToBack,redirectToLogin} from '../utils/authService'

function isDevTools() {
	if(process.env.NODE_ENV !== 'production'){
		return <DevTools />
	}
	return null
}

export default class Root extends Component{
	render(){
		const {store,history,routes} = this.props
		return (
			<Provider store={store}>
			  <div>
			    <Router history={history}>
			    	{routes}
			    </Router>
			    {isDevTools()}
			  </div>
			</Provider>
		)
	}
}