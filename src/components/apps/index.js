import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions'

class MobileApps extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){
    const {actions} = this.props
    actions.getApps()
  }

  render() {
    const {apps} = this.props
    return (
      <div className="settings-box">

        <div className="settings-container">
          <h2 className="title">App 下载</h2>
          <hr />
          {apps.map((items,i)=>
            <div key={i} className="row mobile-apps">
                <p className="version">{items.name}版 
                  <a href={items.gitUrl} target="_blank"><i className="fa fa-github"></i></a>
                </p>
                <ul className="col-sm-7 downloads">
                  <li>
                    <a href={items.downloadUrl.android} className="btn btn-large btn-success">
                      <i className="fa fa-android"></i> 
                      <span>Android版</span>
                    </a>
                  </li>
                  <li>
                    <a href={items.downloadUrl.ios} className="btn btn-large btn-info">
                      <i className="fa fa-mobile"></i> 
                      <span>iPhone版</span>
                    </a>
                  </li>
                </ul>
              <div className="hidden-xs qrcode">
                <img src={items.qrcode} alt="Download app qrcode" />
              </div>
            </div>
          )}


        </div>
      </div>
    )
  }
}

MobileApps.propTypes = {
  actions: PropTypes.object.isRequired,
  apps: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  return {
    apps: state.apps.toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MobileApps)
