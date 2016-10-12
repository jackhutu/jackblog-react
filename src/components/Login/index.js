import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field,reduxForm } from 'redux-form'
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

const validatorCalss = field => {
  let initClass = 'form-control'
  if(field.invalid){
    initClass += ' ng-invalid'
  }
  if(field.dirty){
    initClass += ' ng-dirty'
  }
  return initClass
}

const renderField = prs => (
  <input className={validatorCalss(prs.meta)} name={prs.name} maxLength={prs.maxLength} {...prs.input} placeholder={prs.placeholder} type={prs.type} />
)

@connect(mapStateToProps,mapDispatchToProps)
@reduxForm({
  form: 'signin',
  validate
})
export default class Login extends Component {
  constructor(props){
    super(props)
    this.submitForm = this.submitForm.bind(this)
    this.changeCaptcha = this.changeCaptcha.bind(this)
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    globalVal: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    sns: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func,
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

  submitForm (values) {
    const { actions } = this.props
    actions.localLogin(values)
  }

  componentDidMount() {
    const { actions,sns } = this.props
    if(sns.logins.length < 1){
      actions.getSnsLogins()
    }
  }

  render() {
    const { sns, globalVal: {captchaUrl}, dirty,invalid, handleSubmit} = this.props

    return (
      <div className="signin-box">
        <div className="signin-container">
            <h4 className="title">登 录</h4>
            <form className="signin-form form-horizontal" onSubmit={handleSubmit(this.submitForm)} noValidate>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-addon">
                      <i className="fa fa-envelope-o"></i>
                    </div>
                    <Field name="email" component={renderField} type="email" placeholder="邮箱" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-addon"><i className="fa fa-unlock-alt"></i></div>
                    <Field name="password" component={renderField} type="password" placeholder="密码" />
                  </div>
                </div>
                <div className="form-group" >
                  <div className="col-xs-6 captcha-code">
                    <Field name="captcha" component={renderField} type="text" maxLength="6" placeholder="验证码" />
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