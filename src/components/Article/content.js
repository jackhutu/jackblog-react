import React,{Component,PropTypes} from 'react'

export default class Content extends Component{
  static propTypes = {
    articleDetail: PropTypes.object.isRequired
  }
  render(){
    const {articleDetail} = this.props
    return(
      <div className="article-container">
        <h1 className="title">{articleDetail.title}</h1>
        <div className="counts">
          <span className="views-count">阅读{articleDetail.visit_count}</span>
          <span className="comments-count">评论{articleDetail.comment_count}</span>
          <span className="likes-count">喜欢{articleDetail.like_count}</span>
        </div> 
        <div className="markdown-content" dangerouslySetInnerHTML={{__html: articleDetail.content}} />
      </div>
    )
  }
}