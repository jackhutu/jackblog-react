import React,{Component,PropTypes} from 'react'
import {connect} from 'react-redux'

class ChildA extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
			<div>
				子组件A
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		todos:state.todos
	}
}

export default connect(mapStateToProps)(ChildA)