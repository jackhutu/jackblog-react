// import React, {Component, PropTypes} from 'react'
// import {connect} from 'react-redux'
// import {Link} from 'react-router'
// import * as TodoActions from '../actions/todos'
// import {bindActionCreators} from 'redux'
// //import MainSection from '../components/MainSection'
// export default class User extends Component{
// 	render(){
// 		const {todos,actions,children} = this.props
// 		return (
// 			<div>
// 				<div>
// 					<p>新路由哦.<Link to={'/'}>回到主页</Link></p>
// 					<p><Link to={'/childA'}>GoA</Link></p>
// 					<p><Link to={'/childB'}>GoB</Link></p>
// 					{children}
// 				</div>
// 			</div>
// 		)
// 	}
// }

// User.propTypes = {
// 	todos: PropTypes.array.isRequired,
// 	actions: PropTypes.object.isRequired,
// 	children: PropTypes.node
// }


// function mapStateToProps(state) {
//   return {
//     todos: state.todos
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(TodoActions, dispatch)
//   }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(User)