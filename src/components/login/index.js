import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import * as Actions from '../../actions'
import SNSLogin from './snsLogin'

const mapStateToProps = state =>{
  return {
    globalVal : state.globalVal.toJS(),
    auth: state.auth.toJS(),
    sns: state.sns.toJS()
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(values.email)) {
    errors.email = '无效电子邮件地址'
  }

  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length > 30) {
    errors.password = '密码长度不超过30'
  }
  if (!values.captcha) {
    errors.captcha = 'Required'
  } else if (values.captcha.length !== 6) {
    errors.captcha = '验证码是6位'
  }
  return errors
}

@connect(mapStateToProps,mapDispatchToProps)
@reduxForm({
  form: 'signin',
  fields: ['email', 'password', 'captcha'],
  validate
})
export default class Login extends Component {
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeCaptcha = this.changeCaptcha.bind(this)
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    globalVal: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    sns: PropTypes.object.isRequired,
    values: PropTypes.object,
    fields: PropTypes.object,
    dirty: PropTypes.bool,
    invalid: PropTypes.bool
  }

  static fetchData(params){
    return [Actions.getSnsLogins()]
  }

  changeCaptcha(e){
    e.preventDefault()
    const { actions } = this.props
    actions.getCaptchaUrl()
  }

  handleSubmit (e) {
    e.preventDefault()
    const { values } = this.props
    const { actions } = this.props
    actions.localLogin(values)
  }
  componentDidMount() {
    const { actions,sns } = this.props
    if(sns.logins.length < 1){
      actions.getSnsLogins()
    }
  }

  validatorCalss(field){
    let initClass = 'form-control'
    if(field.invalid){
      initClass += ' ng-invalid'
    }
    if(field.dirty){
      initClass += ' ng-dirty'
    }
    return initClass
  }

  render() {
    const { sns, globalVal: {captchaUrl}, fields: { email, password, captcha }, dirty,invalid } = this.props
    const style = { marginTop: 20 + '%' }
    return (
      <div className="signin-box">
        <div className="signin-container" style={style}>
            <h4 className="title">登 录</h4>
            <form className="signin-form form-horizontal" onSubmit={this.handleSubmit} noValidate>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-addon">
                      <i className="fa fa-envelope-o"></i>
                    </div>
                    <input type="email" 
                          className={ this.validatorCalss(email) } 
                          placeholder="邮箱"
                          {...email} />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-addon"><i className="fa fa-unlock-alt"></i></div>
                    <input type="password"
                           className={ this.validatorCalss(password) }
                           placeholder="密码" 
                           {...password} />
                  </div>
                </div>
                <div className="form-group" >
                  <div className="col-xs-6 captcha-code">
                    <input className={ this.validatorCalss(captcha) }  
                          maxLength="6" 
                          type="text" 
                          placeholder="验证码"
                          {...captcha} />
                  </div>
                  <div className="col-xs-6 captcha-img">
                    <a href="javascript:;" onClick={this.changeCaptcha}>
                      <img src={captchaUrl} />
                    </a>
                  </div>

                </div>
                <div className="form-group">
                  <button disabled={ dirty && invalid } className="btn btn-primary btn-lg btn-block" type="submit">登 录</button>
                </div>

            </form>

            <p className="text-center">您还可以通过以下方式直接登录</p>
            <SNSLogin logins={sns.logins} />
        </div>
      </div>
    )
  }
}