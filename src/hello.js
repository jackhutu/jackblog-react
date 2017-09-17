import React, { Component } from 'react'

export default class Hello extends Component {
  constructor() {
    super()
    this.state = {
      name: 'React'
    }
  }

  render() {
    return (
      <div>
        <p>
          Start editing to see some magic happen :)
        </p>
      </div>
    )
  }
}