import React from 'react'
import { render } from 'react-dom'
import DevTools from './components/DevTools'

export default function createDevTools(store) {
  if(__DEVCLIENT__ && __DEVTOOLS__ && !window.devToolsExtension){
    setTimeout(() => render(
      <DevTools store={store} />,
      window.document.body.appendChild(document.createElement('div'))
    ), 10)
  }
}
