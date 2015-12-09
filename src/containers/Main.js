import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Tags from '../components/main/tags'
import Articles from '../components/main/articles'
import * as TodoActions from '../actions/todos'

class Main extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    const { actions } = this.props
    actions.getTagList()
    actions.getArticleList()
  }

  render() {
    const { actions,children,tagList,articleList } = this.props
    return (
      <div className="col-sm-7 col-sm-offset-3 main-content">
        <Tags tagList={tagList} />
        <Articles articleList={articleList} />
      </div>
    )
  }
}

Main.propTypes = {
  children: PropTypes.node,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    tagList: state.tagList,
    articleList: state.articleList
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
)(Main)
