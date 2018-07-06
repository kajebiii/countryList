import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import CountryList from './components/CountryList'
import reducers from './store/reducers'
import sagas from './store/sagas'
import { initial_country, add_country } from './store/actions'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(sagas)

const action = type => store.dispatch(type)

function render() {
    ReactDOM.render(
        <CountryList 
            country_state={store.getState().country_state}
            action_initial_country={() => action(initial_country())}
            action_add_country={(code, continent, name, capital, phone) => action(add_country(code, continent, name, capital, phone))}
        />,
        document.getElementById('app')
    )
}

render()
store.subscribe(render)