import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/header'
import * as Actions from '../actions'
import * as AuthActions from '../actions/auth'
import Toaster from '../components/Toaster'
import ScrollTop from '../components/scrollTop'

class Home extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount() {
    const { actions,authActions,auth } = this.props
    actions.getIndexImage()
    if(auth.token && !auth.user){
      authActions.getUserInfo(auth.token)
    }
  }
  componentWillReceiveProps(nextProps){
    const { globalVal } = this.props
    if(globalVal.styleMode !== nextProps.globalVal.styleMode){
      document.body.className = nextProps.globalVal.styleMode
    }
  }
  render() {
    const { globalVal,actions,children,auth,authActions,location,showmsg } = this.props
    return (
      <div>
        <Header styleMode={globalVal.styleMode} auth={auth} logout={authActions.logout} location={location} changeStyleMode={actions.changeStyleMode} />
        {children}
        <Toaster msg={showmsg} hideMsg={authActions.hideMsg} />
        <ScrollTop />
      </div>
    )
  }
}

Home.propTypes = {
  globalVal: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  showmsg: PropTypes.object.isRequired,
  children: PropTypes.node,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    globalVal: state.globalVal.toJS(),
    auth: state.auth.toJS(),
    showmsg: state.showmsg.toJS(),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
    authActions: bindActionCreators(AuthActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
