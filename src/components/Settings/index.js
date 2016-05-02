import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import * as Actions from '../../actions'

const validate = values => {
  const errors = {}
  if (!values.nickname) {
    errors.nickname = 'Required'
  } else if (values.nickname.length <= 2 || values.nickname.length >15) {
    errors.nickname = '请输入2-15字符,中英文,数字和下划线'
  } else if (!/^[(\u4e00-\u9fa5)0-9a-zA-Z\_\s@]+$/.test(values.nickname)) {
    errors.nickname = '呢称不合法'
  }
  return errors
}

const mapStateToProps = state =>{
  return {
    auth: state.auth.toJS(),
    initialValues: state.auth.toJS().user
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

@connect(mapStateToProps,mapDispatchToProps)
@reduxForm({
  form: 'settings',
  fields: ['nickname'],
  validate
})
export default class Settings extends Component {
  constructor(props){
    super(props)
    this.handelSubmit = this.handelSubmit.bind(this)
  }
  
  static propTypes = {
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    values: PropTypes.object,
    fields: PropTypes.object,
    dirty: PropTypes.bool,
    invalid: PropTypes.bool
  }
  
  handelSubmit(e){
    e.preventDefault()
    const {values} = this.props
    //更新user nickname
    const {actions} = this.props
    actions.updateUser(values)
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
    const { fields: { nickname },dirty,invalid } = this.props
    return (
      <div className="settings-box">
        <div className="settings-container">
          <h2 className="title">设置</h2>
          <hr />
          <div className="profile">
            <div className="control-group">
                <form className="settings-form" name="settingForm" onSubmit={this.handelSubmit} noValidate>
                  <div className="form-group">
                    <label className="control-label">昵称</label>
                    <input placeholder="2-15字符，中英文、数字和下划线" 
                          {...nickname}
                          type="text" 
                          className={ this.validatorCalss(nickname) }
                          minLength="2" maxLength="15" />
                  </div>
                  <button type="submit" disabled={ dirty && invalid } className="btn btn-block btn-lg btn-primary">保 存</button>
                </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}