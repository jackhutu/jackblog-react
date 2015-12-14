import React, { PropTypes, Component } from 'react'
import {Link} from 'react-router'
import defaultAvatar from '../../assets/images/avatar.png'

export default class Header extends Component{

	render(){
		const {styleMode,changeStyleMode,auth,logout} = this.props

		return (
			<div className="navbar-box navbar-skin">
			  <div className="navbar-menu">
			      <Link activeClassName="active" className="navbar-item logo" title="首页" to="/">
			        Hu
			      </Link>
			  </div>
			  <div className="navbar-expanded">

			      <div>
			        <a className="navbar-item change-mode" href="#" onClick={changeStyleMode}>
			          {(styleMode === 'day-mode')?<i className="fa fa-sun-o"></i>:<i className="fa fa-moon-o"></i>}
			        </a>
			      </div>

			      {(auth.token && auth.user)?
			      	<div>
			      	  <a href="#" className="navbar-item expanded-logout" onClick={logout} title="登出">
			      	      <i className="fa fa-sign-out"></i>
			      	  </a>
			      	  <a href="#" className="navbar-item expanded-avatar" title={auth.user.nickname}>          
			      	    <img src={ auth.user.avatar || defaultAvatar} /> 
			      	  </a>  
			      	</div>
			      	:
			      	<div>
			      	  <Link activeClassName="active" className="navbar-item" title="登录" to="/login">
			      	    <i className="fa fa-sign-in"></i>
			      	  </Link>    
			      	</div>
			      }
			  </div>
			</div>
		)
	}
}