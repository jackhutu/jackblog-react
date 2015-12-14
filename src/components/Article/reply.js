import React,{Component,PropTypes} from 'react'
import {Link} from 'react-router'
import {formatDate} from '../../tools'

export default class Reply extends Component{

	render(){
		const {replys} = this.props
		return(
			<div className="reply-list">
			{replys.map((reply,i)=>
			    
			      <div className="reply-item" key={i}>
			        <p className="reply-content">
			          <a className="reply-user link-light">{reply.user_info.nickname}</a>：
			          {reply.content}
			        </p>
			        <div className="reply-footer text-right">
			          <a className="reply" href="javascript:void(null)">回复</a>
			          <span className="reply-time pull-left">{formatDate(reply.created)}</span>
			        </div>
			      </div>
			  )}
			</div>
		)

	}
}