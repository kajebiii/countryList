import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import Counter from './components/Counter'
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
    ReactDOM.render(
    <Counter
        value={store.getState()}
        onIncrement={() => action('INCREMENT')}
        onDecrement={() => action('DECREMENT')}
        onIncrementAsync={() => action('INCREMENT_ASYNC')}/>,
    document.getElementById('app')
    )
}

render()
store.subscribe(render)