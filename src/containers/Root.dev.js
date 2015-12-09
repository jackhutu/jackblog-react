import React,{Component} from 'react'
import DevTools from './DevTools'
import {Provider} from 'react-redux'
import {ReduxRouter} from 'redux-router'
import {Route,IndexRoute} from 'react-router'
import Home from './Home'
import Main from './Main'

export default class Root extends Component{
	render(){
		const {store} = this.props
		return (
			<Provider store={store}>
			  <div>
			    <ReduxRouter>
			    	<Route path="/" component={Home}>
			    		<IndexRoute component={Main}/>
						</Route>
			    </ReduxRouter>
			    <DevTools />
			  </div>
			</Provider>
		)
	}
}
//<Route path="/index" component={Main} />
/*
<Route path="/user" component={User}>
	<IndexRoute component={ChildA}/>
	<Route path="/childA" component={ChildA} />
	<Route path="/childB" component={ChildB} />
</Route>
 */