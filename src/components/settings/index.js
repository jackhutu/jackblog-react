import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions/auth'

class Settings extends Component {
  constructor(props){
    super(props)
    this.handelSubmit = this.handelSubmit.bind(this)
  }
  
  handelSubmit(e){
    e.preventDefault();
    const {nickname} = this.refs
    //更新user nickname
    const {actions} = this.props
    actions.updateUser({nickname:nickname.value})
  }
  componentWillReceiveProps(nextProps){
    const { auth } = nextProps
    if(auth.errMsg){
      msg.error(auth.errMsg)
    }else if(auth.user !== this.props.auth.user){
      msg.success('修改成功.')
    }
  }
  render() {
    const { actions,auth } = this.props
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
                          required 
                          type="text" 
                          ref="nickname"
                          defaultValue={auth.user.nickname}
                          className="form-control" minLength="2" maxLength="15" />
                  </div>
                  <button type="submit" className="btn btn-block btn-lg btn-primary">保 存</button>
                </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Settings.propTypes = {
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Settings)