import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
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
    const { styleMode,actions,children } = this.props
    return (
      <div className={styleMode}>
        <Header styleMode={styleMode} changeStyleMode={actions.changeStyleMode} />
        <div className="container-fluid main-box">
            {children}
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  styleMode: PropTypes.string.isRequired,
  children: PropTypes.node,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    styleMode: state.styleMode
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
