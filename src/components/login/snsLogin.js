import React,{Component,PropTypes} from 'react'
import cookie from 'react-cookie'
const LOGIN_API = 'http://localhost:9000/auth/'

export default class snsLogin extends Component{
	constructor(props){
		super(props)
		this.snsLogin = this.snsLogin.bind(this)
	}
	snsLogin (e,provider) {
		e.preventDefault()
	  let search = LOGIN_API + provider + '?redirectUrl=' + window.location.origin
	  const token = cookie.load('token')
	  if (token) {
	    search += '&access_token=' + token.replace(/(^\")|(\"$)/g, "")
	  }
	  window.location.href = search
	}

	render(){
		return (
			<div className="login-sns">
			  <ul>
			  <li onClick={e=>this.snsLogin(e,'github')}>
			    <a className="github" href="#"><i className="fa fa-github"></i></a>
			  </li>  
			   <li onClick={e=>this.snsLogin(e,'weibo')}>
			      <a className="weibo" href="#"><i className="fa fa-weibo"></i></a>
			    </li>
			    <li onClick={e=>this.snsLogin(e,'qq')}>
			      <a className="qq" href="#"><i className="fa fa-qq"></i></a>
			    </li>
			  </ul>
			</div>
		)
	}


}