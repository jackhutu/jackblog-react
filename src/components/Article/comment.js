import React,{Component,PropTypes} from 'react'
import {Link} from 'react-router'
import defaultAvatar from '../../assets/images/avatar.png'
import {formatDate} from '../../tools'
import Reply from './reply'

export default class Comment extends Component{

	render(){
		const {commentList} = this.props
		return(
			<div className="comment-container clearfix">
			  <div className="comment-head clearfix">
			    {commentList.length || 0}条评论
			      <a href="javascript:void(null)" className="goto-comment pull-right"><i className="fa fa-pencil"></i>添加新评论</a>
			  </div>
			  <div id="comment_list">
			    {commentList.map((comment,i) =>
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
			            <a className="reply" href="javascript:void(0)">回复</a>
			          </div>
			          {(comment.replys.length > 0)?<Reply replys={comment.replys} />:''}
			          
			        </div>
			      </div>               
			      )
			    }
			  </div>
			</div>
		)

	}
}