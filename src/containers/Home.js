import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import * as TodoActions from '../actions/todos'

class Home extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    const { actions } = this.props
    actions.getIndexImage()
  }

  render() {
    const { styleMode,actions,indexImg,children } = this.props
    return (
      <div className={styleMode}>
        <Header styleMode={styleMode} changeStyleMode={actions.changeStyleMode} />
        <div className="container-fluid main-box">
          <div className="row">
            <Sidebar indexImg={indexImg} />
            {children}
          </div>
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  styleMode: PropTypes.string.isRequired,
  indexImg: PropTypes.string.isRequired,
  children: PropTypes.node,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    styleMode: state.styleMode,
    indexImg: state.indexImg
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
