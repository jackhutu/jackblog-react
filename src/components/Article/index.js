import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as TodoActions from '../../actions/todos'

// import Tags from '../components/main/tags'
// import Articles from '../components/main/articles'
// import Sidebar from '../components/Sidebar'

class Article extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    const { actions } = this.props
    const { params: { id }} = this.props;
    console.log(id);
    // actions.getTagList()
    //actions.getArticleDetail()
  }

  render() {
    const { articleDetail } = this.props
    return (
      <div className="row">
        article{articleDetail}
      </div>
    )
  }
}

Article.propTypes = {
  //articleDetail: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    articleDetail: state.articleDetail
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
)(Article)
