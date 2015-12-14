import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import {Link} from 'react-router'
import {formatDate} from '../../tools'
import Like from './like'
import Prenext from './prenext'
import Comment from './comment'
import Content from './content'
import { pushState } from 'redux-router'

class Article extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    const { params: { id } } = this.props
    this.fetchArticleData(id)
  }

  componentDidUpdate (prevProps) {
    let oldId = prevProps.params.id
    let newId = this.props.params.id
    if (newId !== oldId)
      this.fetchArticleData(newId)
  }

  fetchArticleData(id){
    const { actions} = this.props
    if(id){
      //获取文章详情
      actions.getArticleDetail(id)
      //获取评论
      actions.getCommentList(id)
      //获取上下文章
      actions.getPrenext(id)
    }
  }

  render() {
    const { articleDetail,commentList,prenextArticle } = this.props
    return (
      <div className="article-box">

        <Content articleDetail={articleDetail} />
        <Like likeCount={articleDetail.like_count} />
        <Prenext prenextArticle={prenextArticle}  />
        <Comment commentList={commentList} />

      </div>
    )
  }
}

Article.propTypes = {
  articleDetail: PropTypes.object.isRequired,
  commentList: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  prenextArticle: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    articleDetail: state.articleDetail,
    commentList: state.commentList,
    prenextArticle: state.prenextArticle
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
    pushState
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Article)
