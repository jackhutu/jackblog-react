import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions/auth'
import {pushState} from 'redux-router'

class Login extends Component {
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeCaptcha = this.changeCaptcha.bind(this)
  }
  componentDidMount(){
    //如果已经登录,跳转到首页.
    const { pushState,auth } = this.props
    //console.log(this.props.location.query.next);
    //if(auth.token){
      //pushState(null, '/')
    //}
  }

  changeCaptcha(){
    const { actions } = this.props
    actions.getCaptchaUrl()
  }

  handleSubmit (e) {
    e.preventDefault();
    const {email,password,captcha} = this.refs
    //登录的方法
    const { actions,history } = this.props
    console.log(history);
    //history.goBack()
    actions.localLogin({
      email:email.value,
      password:password.value,
      captcha:captcha.value
    })
  }

  render() {
    const { actions,captchaUrl } = this.props
    return (
      <div className="signin-box">
        <div className="signin-container">
            <h4 className="title">登 录</h4>
            <form className="signin-form form-horizontal" name="signinForm" onSubmit={this.handleSubmit} noValidate>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-addon">
                      <i className="fa fa-envelope-o"></i>
                    </div>
                    <input type="email" 
                          className="form-control" 
                          required 
                          ref="email"
                          placeholder="邮箱" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-addon"><i className="fa fa-unlock-alt"></i></div>
                    <input type="password"
                           required 
                           className="form-control" 
                           ref="password"
                           placeholder="密码" />
                  </div>
                </div>
                <div className="form-group" >
                  <div className="col-xs-6 captcha-code">
                    <input className="form-control" 
                          required maxLength="6" 
                          type="text" 
                          ref="captcha"
                          placeholder="验证码" />
                  </div>
                  <div className="col-xs-6 captcha-img">
                    <a href="#" onClick={this.changeCaptcha}>
                      <img src={captchaUrl} />
                    </a>
                  </div>

                </div>
                <div className="form-group">
                  <button className="btn btn-primary btn-lg btn-block" type="submit">登 录</button>
                </div>

            </form>

            <div className="login-sns">
                <p>您还可以通过以下方式直接登录</p>
                <ul>
                  <li>
                    <a className="github" href="javascript:;"><i className="fa fa-github"></i></a>
                  </li>
                  <li>
                    <a className="weibo" href="javascript:;"><i className="fa fa-weibo"></i></a>
                  </li>
                  <li>
                    <a className="qq" href="javascript:;"><i className="fa fa-qq"></i></a>
                  </li>
                </ul>
            </div>
        </div>

      </div>
    )
  }
}

Login.propTypes = {
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    captchaUrl : state.captchaUrl,
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
    pushState: bindActionCreators(pushState, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)