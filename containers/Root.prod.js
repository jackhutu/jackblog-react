import React,{Component} from 'react'
//import DevTools from './DevTools'
import App from './App'
import User from './User'
import {Provider} from 'react-redux'
import {ReduxRouter} from 'redux-router'
import {Route,IndexRoute} from 'react-router'
import ChildA from './ChildA'
import ChildB from './ChildB'

export default class Root extends Component{
	render(){
		const {store} = this.props
		return (
			<Provider store={store}>
			  <div>
			    <ReduxRouter>
			    	<Route path="/" component={App} />
			
			    	<Route path="/user" component={User}>
			    		<IndexRoute component={ChildA}/>
			    		<Route path="/childA" component={ChildA} />
			    		<Route path="/childB" component={ChildB} />
			    	</Route>
			    </ReduxRouter>
			  </div>
			</Provider>
		)
	}
}
