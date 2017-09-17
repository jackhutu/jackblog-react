import React from 'react'
import { Route } from 'react-router-dom'

const NotFound = () => {
  return (
    <Route render={({ staticContext }) => {
      if (staticContext) {
        staticContext.status = 404
      }
      return (
        <div>
          <p className='not'>404, 页面没有发现.</p>
        </div>
      )
    }}/>
  )
}

export default NotFound