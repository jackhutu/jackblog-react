import React,{Component,PropTypes} from 'react'
import cookie from 'react-cookie'
import {API_ROOT} from '../../config'

export default class snsLogin extends Component{
	constructor(props){
		super(props)
		this.snsLogin = this.snsLogin.bind(this)
	}
	snsLogin (e,provider) {
		e.preventDefault()
	  let search = API_ROOT + 'auth/' + provider + '?redirectUrl=' + window.location.origin
	  const token = cookie.load('token')
	  if (token) {
	    search += '&access_token=' + token.replace(/(^\")|(\"$)/g, "")
	  }
	  window.location.href = search
	}

	render(){
		const {logins} = this.props
		return (
			<div className="login-sns">
			  <ul>
			  	{logins.map((item,i)=>
			  		<li key={i} onClick={e=>this.snsLogin(e,item)}>
			  		  <a className={item} href="#"><i className={"fa fa-" + item}></i></a>
			  		</li> 
			  	)}
			  </ul>
			</div>
		)
	}


}