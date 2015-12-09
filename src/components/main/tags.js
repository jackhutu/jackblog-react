import React,{Component,PropTypes} from 'react'

//列表View
export default class Tags extends Component{
	render(){
		return (
			<ul className="sort-tags list-unstyled clearfix">
				{
					this.props.tagList.map((tag,i)=>
						<li key={i}>
						<a href="javascript:;">{tag.name}</a>
						</li>
					)
				}
			</ul>
		)
	}
}

Tags.PropTypes = {
	tagList:PropTypes.array.isRequired
}