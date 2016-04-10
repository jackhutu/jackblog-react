import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import Like from './like'
import Prenext from './prenext'
import Comment from './comment'
import Content from './content'
import LoginModal from '../Login/modal'

const mapStateToProps = state =>{
  return {
    articleDetail: state.articleDetail.toJS(),
    commentList: state.commentList.toJS(),
    prenextArticle: state.prenextArticle.toJS(),
    auth: state.auth.toJS(),
    sns: state.sns.toJS()
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

@connect(mapStateToProps,mapDispatchToProps)
export default class Article extends Component {
  constructor(props){
    super(props)
    this.toggleLike = this.toggleLike.bind(this)
    this.handleSubmitComment = this.handleSubmitComment.bind(this)
    this.handleSubmitReply = this.handleSubmitReply.bind(this)
    this.openLoginModal = this.openLoginModal.bind(this)
    this.closeLoginModal = this.closeLoginModal.bind(this)
    this.state = {showModal:false}
  }

  static propTypes = {
    articleDetail: PropTypes.object.isRequired,
    commentList: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    prenextArticle: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    sns: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  }

  static fetchData({id}){
    return [
      Actions.getArticleDetail(id),
      Actions.getCommentList(id),
      Actions.getPrenext(id),
      Actions.getSnsLogins()
    ]
  }

  componentDidMount() {
    const { params: { id },actions,articleDetail } = this.props
    if(!articleDetail._id || articleDetail._id !== id){
      this.fetchArticleData(id)
      actions.getSnsLogins()
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.params.id !== this.props.params.id){
      this.fetchArticleData(nextProps.params.id)
    }
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
    }else{
      this.openLoginModal()
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
    const { articleDetail,commentList,prenextArticle,auth,sns } = this.props
    return (
      <div className="article-box">
        <Content articleDetail={articleDetail} />
        <Like likeCount={articleDetail.like_count} isLike={articleDetail.isLike} toggleLike={this.toggleLike} />
        <Prenext prenextArticle={prenextArticle}  />
        <Comment commentList={commentList} auth={auth} 
                submitComment={this.handleSubmitComment} 
                submitReply={this.handleSubmitReply}
                openLoginModal={this.openLoginModal} />
        <LoginModal logins={sns.logins} isShowModal={this.state.showModal} closeModal={this.closeLoginModal} />
      </div>
    )
  }
}