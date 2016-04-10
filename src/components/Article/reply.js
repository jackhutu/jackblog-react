import React,{Component,PropTypes} from 'react'
import {formatDate} from '../../utils'

export default class Reply extends Component{
  constructor(props){
    super(props)
  }
  static propTypes = {
    replys: PropTypes.array.isRequired,
    k: PropTypes.number.isRequired,
    showReply: PropTypes.func.isRequired
  }
  render(){
    const {replys,k,showReply} = this.props
    return(
			<div className="reply-list">
			{replys.map((reply,i)=>
			    
			      <div className="reply-item" key={i}>
			        <p className="reply-content">
			          <a className="reply-user link-light">{reply.user_info.nickname}</a>：
			          {reply.content}
			        </p>
			        <div className="reply-footer text-right">
			          <a className="reply" href="javascript:;" onClick={e=>showReply(e,k,reply.user_info.nickname)} >回复</a>
			          <span className="reply-time pull-left">{formatDate(reply.created)}</span>
			        </div>
			      </div>
			  )}
			</div>
    )
  }
}