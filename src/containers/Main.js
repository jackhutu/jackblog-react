import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Tags from '../components/main/tags'
import Articles from '../components/main/articles'
import * as TodoActions from '../actions/todos'
import Sidebar from '../components/Sidebar'

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
    const { actions,children,indexImg,tagList,articleList } = this.props
    return (
      <div className="row">
        <Sidebar indexImg={indexImg} />
        <div className="col-sm-7 col-sm-offset-3 main-content">
          <Tags tagList={tagList} />
          <Articles articleList={articleList} />
        </div>
      </div>
    )
  }
}

Main.propTypes = {
  indexImg: PropTypes.string.isRequired,
  tagList: PropTypes.array.isRequired,
  articleList: PropTypes.array.isRequired,
  children: PropTypes.node,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    indexImg: state.indexImg,
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
