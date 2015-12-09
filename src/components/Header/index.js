import React, { PropTypes, Component } from 'react'

export default class Header extends Component{
	render(){
		const {styleMode,changeStyleMode} = this.props
		return (
			<div className="navbar-box navbar-skin">
			  <div className="navbar-menu">
			      <a className="navbar-item active logo" title="首页" href="/">
			        Hu
			      </a>
			  </div>
			  <div className="navbar-expanded">

			      <div>
			        <a className="navbar-item change-mode" href="javascript:;" onClick={changeStyleMode}>
			          {(styleMode === 'day-mode')?<i className="fa fa-sun-o"></i>:<i className="fa fa-moon-o"></i>}
			        </a>
			      </div>

			  </div>
			</div>
		)
	}
}