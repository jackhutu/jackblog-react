import React,{Component} from 'react'
import {Provider} from 'react-redux'
import {ReduxRouter} from 'redux-router'
import {Route,IndexRoute} from 'react-router'
import Home from './Home'


export default class Root extends Component{
	render(){
		const {store} = this.props
		return (
			<Provider store={store}>
			  <div>
			    <ReduxRouter>
			    	<Route path="/" component={Home}>

						</Route>

			    </ReduxRouter>
			  </div>
			</Provider>
		)
	}
}

/*
<Route path="/user" component={User}>
	<IndexRoute component={ChildA}/>
	<Route path="/childA" component={ChildA} />
	<Route path="/childB" component={ChildB} />
</Route>
 */