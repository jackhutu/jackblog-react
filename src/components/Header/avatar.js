import React, { Component } from 'react'
import PropTypes from 'prop-types'
import defaultAvatar from 'assets/images/avatar.png'

export default class Avatar extends Component{
  constructor(props,context){
    super(props, context)
  }
  static propTypes = {
    auth: PropTypes.object.isRequired,
    bsRole: PropTypes.string
  }

  render(){
    const {auth, ...rest } = this.props    
    return(
      <a href="javascript:;" className="shrink-avatar" {...rest}>
        <img src={ auth.user.avatar || defaultAvatar} /> 
      </a>
    )
  }
}
