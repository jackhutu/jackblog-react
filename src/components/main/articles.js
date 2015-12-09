import React,{Component,PropTypes} from 'react'
import {customTime} from '../../tools'
//列表View
export default class Articles extends Component{
	render(){
		return (
			<ul className="article-list list-unstyled clearfix">
				{
					this.props.articleList.map((article,i)=>
						<li className={(article.images.length > 0)?"article-item have-img":"article-item" } key={i}>
							{(article.images.length > 0)?
								<a className="wrap-img">
								<img src={article.images[0].url + '?imageView2/2/w/100/h/100'} /></a>:'' }
							<div>
							  <p className="list-top">               
							  <span className="time">{ customTime(article.publish_time) }</span>
							  </p>
							  <h4 className="title">
							  	<a className="link-title">{article.title}</a>
							  </h4>
							  <div className="list-footer">
							    <span>阅读 {article.visit_count}</span>
							    <span> · 评论 {article.comment_count}</span>        
							    <span> · 喜欢 {article.like_count}</span>
							  </div>
							</div>
						</li>
					)
				}
			</ul>
		)
	}
}

Articles.PropTypes = {
	articleList:PropTypes.array.isRequired
}



/*
							<a className="wrap-img">
							  <img src="{article.images[0].url}?imageView2/2/w/100/h/100" />
							</a>
							(articleImageUrl = article.images[0].url + "?imageView2/2/w/100/h/100")
 */