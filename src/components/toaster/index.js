import React,{Component,PropTypes} from 'react'
import AlertContainer from 'react-alert'
import {getCookie,removeCookie} from '../../utils/authService'

export default class toaster extends Component{
	constructor(props){
	  super(props);
	  this.alertOptions = {
	    offset: 14,
	    position: 'top right',
	    theme: 'dark',  //dark,light
	    time: 2000,
	    transition: 'fade' //scale,fade
	  };
	}
	componentDidMount() {
	  let snsmsg = getCookie('snsmsg')
	  if(snsmsg){
	    snsmsg.msgtype === 'success'?msg.success(snsmsg.msg):msg.error(snsmsg.msg)
	    removeCookie('snsmsg');
	  }
	}
	render(){
		return (
		  <div>
		  	<AlertContainer ref={(a) => global.msg = a} {...this.alertOptions} />
		  </div>
		)
	}
}