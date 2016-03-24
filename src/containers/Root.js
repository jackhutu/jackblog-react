import React,{Component} from 'react'
import DevTools from './DevTools'
import {Provider} from 'react-redux'
import { Router,Route,IndexRoute} from 'react-router'

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