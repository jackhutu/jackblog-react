import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions/auth'
import {pushState} from 'redux-router'

export default class MobileApps extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className="settings-box">

        <div className="settings-container">
          <h2 className="title">App 下载</h2>
          <hr />
          <div className="row mobile-apps">
              <p className="version">React Native版 
                <a href="http://github.com/jackhutu/jackblog-react-native-redux" target="_blank"><i className="fa fa-github"></i></a>
              </p>
              <ul className="col-sm-7 downloads">
                <li>
                  <a href="javascript:void(0)" className="btn btn-large btn-success">
                    <i className="fa fa-android"></i> 
                    <span>Android版</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="btn btn-large btn-info">
                    <i className="fa fa-mobile"></i> 
                    <span>iPhone版</span>
                  </a>
                </li>
              </ul>
            <div className="hidden-xs qrcode">
              <img src="http://cdn0.jianshu.io/assets/app-page/download-app-qrcode-85008f146773a25ce86bcc4d7858af68.png" alt="Download app qrcode" />
            </div>
          </div>

        </div>
      </div>
    )
  }
}
