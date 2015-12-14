import React,{Component,PropTypes} from 'react'

export default class Like extends Component{

	render(){
		const {likeCount} = this.props
		return(
			<div className="article-share clearfix">
			  <a href="javascript:;" className="like-btn">
			      <span className="like-content">
			        <i className="fa "></i>  喜欢
			      </span>
			      <span className="like-count">{likeCount}</span>        
			  </a>
			</div>
		)

	}
}