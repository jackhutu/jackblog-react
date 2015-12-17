import React,{Component,PropTypes} from 'react'
import {Modal} from 'react-bootstrap'
import SNSLogin from './snsLogin'
const LOGIN_API = 'http://localhost:9000/auth/'

export default class loginModal extends Component{
	render(){
		const {isShowModal,closeModal} = this.props
		return (
		  <div>
		    <Modal show={isShowModal} backdrop={true} onHide={closeModal}>
		      <Modal.Header>
		        <Modal.Title className="text-center">请用以下方式登录</Modal.Title>
		      </Modal.Header>
		      <Modal.Body>
		      	<div className="portlet-body">
		      		<SNSLogin />
		      	</div>
		      </Modal.Body>

		    </Modal>
		  </div>
		)
	}
}