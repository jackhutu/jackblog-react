import React,{Component,PropTypes} from 'react'
import AlertContainer from 'react-alert'

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

	render(){
		return (
		  <div>
		  	<AlertContainer ref={(a) => global.msg = a} {...this.alertOptions} />
		  </div>
		)
	}
}