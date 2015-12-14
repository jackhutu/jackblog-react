import React,{Component,PropTypes} from 'react'
import {Link} from 'react-router'

//列表View
export default class LoadMore extends Component{
	render(){
		const {addData,options,isMore,isFetching} = this.props
		return (
			<div className="load-more">
				{isMore && 
				  <button className="ladda-button" onClick={ e => addData(e,{'currentPage':++options.currentPage},true)}>
				  	{isFetching? <span className="ladda-spinner"><i className="fa fa-spinner fa-spin"></i></span>:<span className="ladda-label">点击查看更多</span>}
				  </button>
				}
			</div>
		)
	}
}
