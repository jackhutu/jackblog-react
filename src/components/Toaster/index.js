import React,{Component,PropTypes} from 'react'
import Alert from 'react-s-alert'
import { getCookie,removeCookie } from '../../utils/authService'

export default class toaster extends Component{
  constructor(props){
    super(props)
  }
  static propTypes = {
    hideMsg: PropTypes.func.isRequired
  }
  componentWillReceiveProps(nextProps){
    const { msg } = nextProps
    const { hideMsg } = this.props
    if(msg.content !== '' && msg.type){
      switch(msg.type){
        case 'error':
          Alert.error(msg.content)
          break
        case 'success':
          Alert.success(msg.content)
          break
        case 'info':
          Alert.info(msg.content)
          break
        case 'warning':
          Alert.warning(msg.content)
          break
        default:
          Alert.error(msg.content)
      }
      hideMsg()
    }
  }
  componentDidMount() {
    let snsmsg = getCookie('snsmsg')
    if(snsmsg){
      snsmsg.msgtype === 'success'?Alert.success(snsmsg.msg):Alert.error(snsmsg.msg)
      removeCookie('snsmsg')
    }
  }
  render(){
    return (
      <div>
        <Alert stack={{limit: 1}} position='top-right' timeout={3000} />
      </div>
    )
  }
}