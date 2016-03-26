import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import * as Actions from '../actions'
import Toaster from '../components/Toaster'
import ScrollTop from '../components/ScrollTop'

class App extends Component {
  constructor(props){
    super(props)
  }
  // componentDidMount() {
  //   const { actions,auth } = this.props
  //   actions.getIndexImage()
  //   if(auth.token && !auth.user){
  //     actions.getUserInfo(auth.token)
  //   }
  // }
  static fetchData(params){
    return [Actions.getIndexImage(),Actions.getUserInfo()]
  }

  componentWillReceiveProps(nextProps){
    const { globalVal } = this.props
    if(globalVal.styleMode !== nextProps.globalVal.styleMode){
      document.body.className = nextProps.globalVal.styleMode
    }
  }
  render() {
    const { globalVal,actions,children,auth,location,showmsg } = this.props
    return (
      <div>
        <Header styleMode={globalVal.styleMode} auth={auth} logout={actions.logout} location={location} changeStyleMode={actions.changeStyleMode} />
        {children}
        <Toaster msg={showmsg} hideMsg={actions.hideMsg} />
        <ScrollTop />
      </div>
    )
  }
}

App.propTypes = {
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
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
