import React, { PropTypes, Component } from 'react'
import {Link} from 'react-router'
import defaultAvatar from '../../assets/images/avatar.png'
import {Dropdown} from 'react-bootstrap'

export default class Header extends Component{
	constructor(props){
		super(props)
		this.handleChangeMode = this.handleChangeMode.bind(this)
	}
	handleChangeMode(e){
    e.preventDefault()
		const {changeStyleMode} = this.props
		changeStyleMode()
	}
	render(){
		const {styleMode,auth,logout,location} = this.props
		return (
			<div className="navbar-box navbar-skin">
			  <div className="navbar-menu">
			      <Link className={"navbar-item logo " + (location.pathname !== '/apps'&&'active')} title="首页" to="/">
			        Hu
			      </Link>
			      <Link activeClassName="active" className="navbar-item mobile hidden-xs" title="移动应用" to="/apps">
			      	<i className="fa fa-mobile"></i>
			      </Link>
			  </div>   

			  <div className="navbar-expanded">
			      <div>
				      <a className="navbar-item expanded-version" href="http://redux.jackhu.top" title="React">
				        <img src='http://upload.jackhu.top/icons/react.png-32x32' /> 
				      </a>
				      <a className="navbar-item expanded-version" href="http://angular1.jackhu.top" title="Angular1.x">
				      	<img src='http://upload.jackhu.top/icons/AngularJS.png-32x32' /> 
				      </a>
			        <a className="navbar-item change-mode" href="#" onClick={this.handleChangeMode}>
			          {(styleMode === 'day-mode')?<i className="fa fa-sun-o"></i>:<i className="fa fa-moon-o"></i>}
			        </a>
			      </div>

			      {(auth.token && auth.user)?
			      	<div>
			      	  <a href="#" className="navbar-item expanded-logout" onClick={logout} title="登出">
			      	      <i className="fa fa-sign-out"></i>
			      	  </a>
			      	  <Link to="/settings" href="#" className="navbar-item expanded-avatar" title={auth.user.nickname}>          
			      	    <img src={ auth.user.avatar || defaultAvatar} /> 
			      	  </Link>  
			      	</div>
			      	:
			      	<div>
			      	  <Link activeClassName="active" className="navbar-item" title="登录" to="/login">
			      	    <i className="fa fa-sign-in"></i>
			      	  </Link>    
			      	</div>
			      }
			  </div>

			  <div className="navbar-shrink">
			  	{(auth.token && auth.user)?
	  		    <Dropdown id="dropdown-custom-menu" className="pull-right">
	  		      <a href="#" className="shrink-avatar" bsRole="toggle">
	  		        <img src={ auth.user.avatar || defaultAvatar} /> 
	  		      </a>
	  		      <ul className="dropdown-menu" bsRole="menu">
	  		        <li>
	  		          <Link to="/settings"><i className="fa fa-cog"></i> 设置</Link>
	  		        </li>
	  		        <li className="divider"></li>
	  		        <li>
	  		          <a href="#" className="shrink-logout" onClick={logout}>
	  		              <i className="fa fa-sign-out"></i> 登出
	  		          </a>  
	  		        </li>
	  		      </ul>
	  		    </Dropdown>
			  		:
			  		<div className="pull-right">
			  		  <Link className="shrink-login" title="登录" to="/login">
			  		      <i className="fa fa-sign-in"></i> 登录
			  		  </Link>
			  		</div>
			  	}
			  	<div className="pull-right">
			  	  <a className="navbar-item change-mode" href="#" onClick={this.handleChangeMode}>
			  	  	{(styleMode === 'day-mode')?<i className="fa fa-sun-o"></i>:<i className="fa fa-moon-o"></i>}
			  	  </a>
			  	</div>
			  </div>
			</div>
		)
	}
}