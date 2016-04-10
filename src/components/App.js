import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import * as Actions from '../actions'
import Toaster from '../components/Toaster'
import ScrollTop from '../components/ScrollTop'

const mapStateToProps = state =>{
  return {
    globalVal: state.globalVal.toJS(),
    auth: state.auth.toJS(),
    showmsg: state.showmsg.toJS()
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

@connect(mapStateToProps,mapDispatchToProps)
export default class App extends Component {
  constructor(props){
    super(props)
  }

  static fetchData(params){
    return [Actions.getUserInfo(),Actions.getIndexImage()]
  }

  static propTypes = {
    globalVal: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    showmsg: PropTypes.object.isRequired,
    children: PropTypes.node,
    actions: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
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