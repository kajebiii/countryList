import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import CountryList from './components/CountryList'
import reducers from './store/reducers'
import sagas from './store/sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(sagas)

const action = type => store.dispatch({type})

function render() {
    //ReactDOM.render(<HelloWorld />, document.getElementById('app'))
    var country_state = {}
    for(var i=0; i<10; i++) {
        country_state["code"+i] = {
        capital:"capital"+i,
        name:"name"+i,
        continent:"continent"+i,
        phone:"phone"+i,
        }
    }
    ReactDOM.render(
        <CountryList country_state={country_state}/>,
        document.getElementById('app')
    )
}

render()
store.subscribe(render)