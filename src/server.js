import React from 'react'
import { renderToString } from 'react-dom/server'
import { RouterContext, match, createMemoryHistory } from 'react-router'
import { Provider } from 'react-redux'
import routes from 'routes.js'
import configureStore from './store/configureStore'

function fetchAllData(dispatch, components, params) {
  const needs = components
    	.filter(x=>x.fetchData)
    	.reduce((prev,current)=>{
    		return current.fetchData(params).concat(prev)
    	},[])
    	.map(x=>{
    		return dispatch(x)
    	})
  return Promise.all(needs)
}

export default function render(req, res) {
	const history = createMemoryHistory()
	const store = configureStore({}, history)

	match({ routes:routes(), location: req.url }, (error, redirectLocation, renderProps) => {
	  if (error) {
	    res.status(500).send(error.message);
	  } else if (redirectLocation) {
	    res.redirect(302, redirectLocation.pathname + redirectLocation.search);
	  } else if (renderProps) {
	    const InitialView = (
	      <Provider store={store}>
	          <RouterContext {...renderProps} />
	      </Provider>
	    )
	    fetchAllData(store.dispatch, renderProps.components, renderProps.params)
	    .then(html=>{
	    	const componentHTML = renderToString(InitialView)
	    	const initialState = store.getState()
	    	console.dir(initialState.tagList.toJS())
	    	res.render('index', {
	    	    __html__: html,
	    	    __state__: JSON.stringify(initialState)
	    	})
	    }).catch(err => {
	      res.render('index', {
	          __html__: "",
	          __state__: {}
	      })
	    })
	  } else {
	    res.status(404).send('Not Found');
	  }
	})
}