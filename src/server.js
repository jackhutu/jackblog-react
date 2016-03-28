import React from 'react'
import { renderToString } from 'react-dom/server'
import { RouterContext, match, createMemoryHistory } from 'react-router'
import { Provider } from 'react-redux'
import reactCookie from 'react-cookie'
import { fromJS,Map,List } from 'immutable'
import configureStore from './store/configureStore'
import routes from './routes'

async function fetchAllData(dispatch, components, params) {
  const needs = components
      .filter(x=>x.fetchData)
      .reduce((prev,current)=>{
        return current.fetchData(params).concat(prev)
      },[])
    	.map(x=>{
        return dispatch(x)
    	})
  return await Promise.all(needs)
}

function renderFullPage(renderedContent, initialState) {
  return `<!doctype html>
  <html>
    <head>
      <base href="/">
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width">
      <title>Jack Hu's blog for React</title>
      <meta name="description" content="This is Jack Hu's blog. use react redux.">
      <meta name="keyword" content="Jackblog react redux react-router react-redux-router react-bootstrap react-alert">
      <link rel="stylesheet" href="/style.css"/>
    </head>
    <body class="day-mode">
    <div class="top-box" id="root">${renderedContent}</div>
    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
    </script>
    <script type="text/javascript" charset="utf-8" src="/bundle.js"></script>
    </body>
  </html>
  `
}
export default function render(req, res) {
  reactCookie.plugToRequest(req, res)
	const history = createMemoryHistory()
  const token = reactCookie.load('token') || null
	const store = configureStore({auth:fromJS({
    token: token,
    user: null
  })}, history)

	match({ routes:routes(), location: req.url }, (error, redirectLocation, renderProps) => {
	  if (error) {
	    res.status(500).send(error.message)
	  } else if (redirectLocation) {
	    res.redirect(302, redirectLocation.pathname + redirectLocation.search)
	  } else if (renderProps) {
      return fetchAllData(store.dispatch, renderProps.components, renderProps.params)
  	    .then(html=>{
          const InitialView = (
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>)
  	    	const componentHTML = renderToString(InitialView)
  	    	const initialState = store.getState()
          if(__DEVSERVER__){
            return res.status(200).end(renderFullPage(componentHTML, initialState))
          }else{
            return res.render('index', {__html__: componentHTML,__state__: JSON.stringify(initialState)})
          }
  	    }).catch(err => {
          if(__DEVSERVER__){
            return res.end(renderFullPage("",{}))
          }else{
            return res.render('index', {__html__: "",__state__: {}})
          }
  	    })
	  } else {
	    res.status(404).send('Not Found')
	  }
	})
}