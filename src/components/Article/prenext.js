import React,{Component,PropTypes} from 'react'
import {Link} from 'react-router'

export default class Prenext extends Component{
  static propTypes = {
    prenextArticle: PropTypes.object.isRequired
  }
  render(){
    const {prenextArticle} = this.props
    return(
      <div className="prenext">
        {prenextArticle.prev._id?
          <div className="text-left prev">
          <Link className="link-title" to={'/article/' + prenextArticle.prev._id }><span>上一篇:</span>{prenextArticle.prev.title} </Link>
          </div>
        :''}
        
        {prenextArticle.next._id?
          <div className="text-right next">
            <Link className="link-title" to={'/article/' + prenextArticle.next._id }><span>下一篇:</span> {prenextArticle.next.title}</Link>
          </div>
          :''}

      </div>
    )

  }
}