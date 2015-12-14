import React,{Component} from 'react'
import DevTools from './DevTools'
import {Provider} from 'react-redux'
import {ReduxRouter} from 'redux-router'
import {Route,IndexRoute} from 'react-router'
import Home from './Home'
import Main from '../components/main'
import Article from '../components/article'
import Login from '../components/login'
import cookie from 'react-cookie'
import {isLogin} from '../tools/authService'

function redirectToBack(nextState, replaceState) {
	//已经登录则不进入
  if (isLogin()) {
    replaceState(null, '/')
  }
}

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
			    		<Login path="/login" component={Login} onEnter={redirectToBack} />
						</Route>
			    </ReduxRouter>
			    <DevTools />
			  </div>
			</Provider>
		)
	}
}