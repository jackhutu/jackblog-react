import React,{Component,PropTypes} from 'react'
import defaultAvatar from '../../assets/images/avatar.png'
import {formatDate} from '../../utils'
import Reply from './reply'

export default class Comment extends Component{
  constructor(props){
    super(props)
    this.state = {
      commentContent:''
    }
    this.showReply = this.showReply.bind(this)
    this.gotoComment = this.gotoComment.bind(this)
    this.handleSubmitReply = this.handleSubmitReply.bind(this)
    this.handleCommentContentChange = this.handleCommentContentChange.bind(this)
  }
  static propTypes = {
    commentList: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    submitComment: PropTypes.func.isRequired,
    submitReply: PropTypes.func.isRequired,
    openLoginModal: PropTypes.func.isRequired
  }

  showReply(e,k,nickname){
    e.preventDefault()
    //只有登录过的才可以回复
    const {auth} = this.props
    if(auth.token){
      const eleForm = this.refs['reply_form_'+k]
      const eleTextarea = eleForm.getElementsByTagName('textarea')[0]
      if(eleForm.className.indexOf('hide') != -1){
        eleForm.className = 'new-reply'
        eleTextarea.focus()
        this.refs['replyContent'+k].value = '@' + nickname + ' '
      }else{
        eleForm.className += ' hide'
      }
    }else{
      //弹出登录模块
      const {openLoginModal} = this.props
      openLoginModal()
    }
  }
  
  gotoComment(e){
    e.preventDefault()
    const {auth} = this.props
    if(auth.token){
      document.getElementById('comment_content').focus()
    }else{
      //弹出登录模块
      const {openLoginModal} = this.props
      openLoginModal()
    }
  }  

  handleSubmitReply(e,i,cid){
    e.preventDefault()
    const content = this.refs['replyContent'+i].value
    const {submitReply} = this.props
    const eleForm = this.refs['reply_form_'+i]
    submitReply(e,cid,content)
    eleForm.className += ' hide'
  }

  handleCommentContentChange(event) {
    this.setState({commentContent: event.target.value})
  }

  render(){
    const {commentList,auth,submitComment,openLoginModal} = this.props
    return(
      <div className="comment-container clearfix">
        <div className="comment-head clearfix">
          {commentList.items.length || 0}条评论
            <a href="javascript:;" onClick={e=>this.gotoComment(e)} className="goto-comment pull-right"><i className="fa fa-pencil"></i>添加新评论</a>
        </div>
        <div id="comment_list">
          {commentList.items.map((comment,i) =>
            <div className="comment-item" key={i}>
              <div className="content">
                <div className="meta-top">
                  <a className="avatar">
                    <img src={comment.user_id.avatar || defaultAvatar} alt={comment.user_id.nickname} />
                  </a>        
                  <a className="author-name link-light">{comment.user_id.nickname}</a>
                  <span className="reply-time">
                    {formatDate(comment.created)}
                  </span>
                </div>
                <p className="comment-content">{comment.content}</p>
                <div className="comment-footer text-right">
                  <a className="reply" href="javascript:;" onClick={e=>this.showReply(e,i,comment.user_id.nickname)}>回复</a>
                </div>
                <Reply replys={comment.replys} k={i} showReply={this.showReply} />

                 <form className="new-reply hide" ref={'reply_form_'+i} id={'reply_form_'+i} onSubmit={e=>this.handleSubmitReply(e,i,comment._id)}> 
                   <div className="comment-text"> 
                     <textarea id={'replyContent'+i} 
                            maxLength="2000" 
                            ref={'replyContent'+i}
                            placeholder="写下你的回复…"></textarea> 
                     <div> 
                       <input type="submit" value="发 表" className="btn btn-sm btn-info" /> 
                     </div> 
                   </div>
                 </form>

              </div>
            </div>               
            )
          }
        </div>

        { auth.token ?
          <form className="new_comment" onSubmit={e => submitComment(e,this.state.commentContent)}>
            <div className="comment-text">
              <textarea 
                maxLength="2000" 
                required 
                placeholder="写下你的评论…" 
                onChange={this.handleCommentContentChange}
                id="comment_content">
              </textarea>
                <div>
                  <input type="submit" id="comment_submit_btn" value="发 表" className="btn btn-info" />
                </div>
            </div>
          </form>
        : 
          <div>
            <p className="comment-signin">
                <button className="btn btn-info" onClick={openLoginModal}>登录后发表评论</button>  
            </p>
          </div>
        }

      </div>
    )

  }
}