import React,{Component,PropTypes} from 'react'

export default class Like extends Component{
  static propTypes = {
    likeCount: PropTypes.number,
    isLike: PropTypes.bool,
    toggleLike: PropTypes.func.isRequired
  }
  render(){
    const {likeCount,isLike,toggleLike} = this.props
    return(
      <div className="article-share clearfix">
        <a href="javascript:;" className={isLike?'like-btn note-liked':'like-btn'} onClick={toggleLike}>
            <span className="like-content">
              <i className={isLike?'fa fa-heart':'fa fa-heart-o'}></i>  喜欢
            </span>
            <span className="like-count">{likeCount}</span>        
        </a>
      </div>
    )
  }
}