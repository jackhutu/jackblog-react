import React,{Component,PropTypes} from 'react'
import {Modal} from 'react-bootstrap'
import SNSLogin from './snsLogin'

export default class loginModal extends Component{
  static propTypes = {
    isShowModal: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    logins: PropTypes.array.isRequired
  }
  render(){
    const {isShowModal,closeModal,logins} = this.props
    return (
      <div>
        <Modal show={isShowModal} backdrop={true} onHide={closeModal}>
          <Modal.Header>
            <Modal.Title className="text-center">请用以下方式登录</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="portlet-body">
              <SNSLogin logins={logins} />
            </div>
          </Modal.Body>

        </Modal>
      </div>
    )
  }
}