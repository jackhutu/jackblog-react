import React,{Component,PropTypes} from 'react'
import {getCookie} from '../../utils/authService'
import {API_ROOT} from '../../config'

export default class snsLogin extends Component{
  constructor(props){
    super(props)
    this.handleSnsLogin = this.handleSnsLogin.bind(this)
  }
  static propTypes = {
    logins: PropTypes.array.isRequired
  }
  handleSnsLogin (e,provider) {
    e.preventDefault()
    let search = API_ROOT + 'auth/' + provider + '?redirectUrl=' + window.location.origin
    const token = getCookie('token')
    if (token) {
      search += '&access_token=' + token.replace(/(^\")|(\"$)/g, '')
    }
    window.location.href = search
  }

  render(){
    const {logins} = this.props
    return (
      <div className="login-sns">
        <ul>
          {logins.map((item,i)=>
            <li key={i} onClick={e=>this.handleSnsLogin(e,item)}>
              <a className={item} href="javascript:;"><i className={'fa fa-' + item}></i></a>
            </li> 
          )}
        </ul>
      </div>
    )
  }
}