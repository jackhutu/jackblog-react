import React,{Component} from 'react'
import DevTools from './DevTools'
import {Provider} from 'react-redux'
import {ReduxRouter} from 'redux-router'
import {Route,IndexRoute} from 'react-router'
import Home from './Home'
import Main from './Main'
import Article from '../components/Article'

export default class Root extends Component{
	render(){
		const {store} = this.props
		return (
			<Provider store={store}>
			  <div>
			    <ReduxRouter>
			    	<Route path="/" component={Home}>
			    		<IndexRoute component={Main}/>
			    		<Article path="/article/:id" component={Article} />
						</Route>
			    </ReduxRouter>
			    <DevTools />
			  </div>
			</Provider>
		)
	}
}