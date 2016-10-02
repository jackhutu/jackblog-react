import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { Dropdown } from 'react-bootstrap'
import defaultAvatar from '../../assets/images/avatar.png'

export default class Header extends Component{
  constructor(props){
    super(props)
    this.handleChangeMode = this.handleChangeMode.bind(this)
  }
  static propTypes = {
    styleMode: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    changeStyleMode: PropTypes.func.isRequired
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
            <Link className={'navbar-item logo ' + (location.pathname !== '/apps'&&'active')} title="首页" to="/">
              Hu
            </Link>
            <Link activeClassName="active" className="navbar-item mobile" title="移动应用" to="/apps">
              <i className="fa fa-mobile"></i>
            </Link>
        </div>   

        <div className="navbar-expanded">
            <div>
              <a className="expanded-var angular2" href="//angular2.jackhu.top" title="Angular2.x版">
              </a>
              <a className="expanded-var vue" href="//vue.jackhu.top" title="Vue版">
              </a>
              <a className="expanded-var react" href="//react.jackhu.top" title="React版">
              </a>
              <a className="expanded-var angular1" href="//angular.jackhu.top" title="Angular1.x版">
              </a>
              <a className="navbar-item change-mode" href="javascript:;" onClick={this.handleChangeMode}>
                {(styleMode === 'day-mode')?<i className="fa fa-sun-o"></i>:<i className="fa fa-moon-o"></i>}
              </a>
            </div>

            {(auth.token && auth.user)?
              <div>
                <a href="javascript:;" className="navbar-item expanded-logout" onClick={logout} title="登出">
                    <i className="fa fa-sign-out"></i>
                </a>
                <Link to="/settings" className="navbar-item expanded-avatar" title={auth.user.nickname}>          
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
            <Dropdown id="dropdown-menu" className="pull-right">
              <a href="javascript:;" className="shrink-avatar" bsRole="toggle">
                <img src={ auth.user.avatar || defaultAvatar} /> 
              </a>
              <Dropdown.Menu className="dropdown-menu">
                <li>
                  <Link to="/settings"><i className="fa fa-cog"></i> 设置</Link>
                </li>
                <li className="divider"></li>
                <li>
                  <a href="javascript:;" className="shrink-logout" onClick={logout}>
                    <i className="fa fa-sign-out"></i> 登出
                  </a>  
                </li>
              </Dropdown.Menu>
            </Dropdown>
            :
            <div className="pull-right">
              <Link className="shrink-login" title="登录" to="/login">
                  <i className="fa fa-sign-in"></i> 登录
              </Link>
            </div>
          }
          <a className="pull-right navbar-item change-mode" href="javascript:;" onClick={this.handleChangeMode}>
            {(styleMode === 'day-mode')?<i className="fa fa-sun-o"></i>:<i className="fa fa-moon-o"></i>}
          </a>
          <a className="pull-right expanded-var angular1" href="//angular.jackhu.top" title="Angular1.x版">
          </a>
          <a className="pull-right expanded-var react" href="//react.jackhu.top" title="React版">
          </a>
          <a className="pull-right expanded-var vue" href="//vue.jackhu.top" title="Vue版">
          </a>
          <a className="pull-right expanded-var angular2" href="//angular2.jackhu.top" title="Agnular2.x版">
          </a>
        </div>
      </div>
    )
  }
}