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
import LoginModal from '../login/modal'

class Article extends Component {
  constructor(props){
    super(props)
    this.toggleLike = this.toggleLike.bind(this)
    this.handleSubmitComment = this.handleSubmitComment.bind(this)
    this.handleSubmitReply = this.handleSubmitReply.bind(this)
    this.openLoginModal = this.openLoginModal.bind(this)
    this.closeLoginModal = this.closeLoginModal.bind(this)
    this.state = {showModal:false}
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

  toggleLike(){
    const {actions,params,auth} = this.props
    if(auth.token){
      actions.toggleLike(params.id)
    }
  }
  handleSubmitComment(e,content){
    e.preventDefault()
    const {actions,params} = this.props
    //提交新评论
    actions.addComment({aid:params.id,content:content})
  }
  //提交回复
  handleSubmitReply(e,cid,content){
    e.preventDefault()
    const {actions} = this.props
    actions.addReply(cid,{content:content})
  }

  openLoginModal(){
    this.setState({showModal:true})
  }

  closeLoginModal(){
    this.setState({showModal:false})
  }

  render() {
    const { articleDetail,commentList,prenextArticle,auth } = this.props
    return (
      <div className="article-box">

        <Content articleDetail={articleDetail} />
        <Like likeCount={articleDetail.like_count} isLike={articleDetail.isLike} toggleLike={this.toggleLike} />
        <Prenext prenextArticle={prenextArticle}  />
        <Comment commentList={commentList} auth={auth} 
                submitComment={this.handleSubmitComment} 
                submitReply={this.handleSubmitReply}
                openLoginModal={this.openLoginModal} />
        <LoginModal isShowModal={this.state.showModal} closeModal={this.closeLoginModal} />
      </div>
    )
  }
}

Article.propTypes = {
  articleDetail: PropTypes.object.isRequired,
  commentList: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  prenextArticle: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    articleDetail: state.articleDetail,
    commentList: state.commentList,
    prenextArticle: state.prenextArticle,
    auth: state.auth
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
)(Article)
