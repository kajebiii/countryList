import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'

import CountryList from './containers/CountryList'
import AlertList from './containers/AlertList'
import reducers from './store/reducers'
import sagas from './store/sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(sagas)

const action = type => store.dispatch(type)

function render() {
    ReactDOM.render(
        <Provider store={store}>
            <CountryList/>
        </Provider>,
        document.getElementById('app')
    )
    ReactDOM.render(
        <Provider store={store}>
            <AlertList/>
        </Provider>,
        document.getElementById('alert')
    )
}

render()
store.subscribe(render)