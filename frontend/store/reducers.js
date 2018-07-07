import * as actions from './actions'
import { combineReducers } from 'redux'

const initialCountryState = {
}
  
const country_state = (country_state = initialCountryState, action) => {
    switch(action.type) {
        case actions.INITIAL_COUNTRY:
            return initialCountryState
        case actions.SET_COUNTRY:
            return action.country_dictionary
        case actions.ADD_COUNTRY:
            var { code, continent, name, capital, phone } = action
            return {...country_state, [code]: {capital, name, continent, phone}}
        case actions.DELETE_COUNTRY:
            const delete_state = Object.assign({}, country_state)
            delete delete_state[action.code]
            return delete_state
        case actions.MODIFY_COUNTRY:
            var { beforeCode, code, continent, name, capital, phone } = action
            const modify_state = Object.assign({}, country_state)
            delete modify_state[beforeCode]
            return {...modify_state, [code]: {capital, name, continent, phone}}
        default:
            return country_state
    }
}

const initialSortState = {
    headIndex:0, 
    buttonIndex:0,
}

const sort_state = (sort_state = initialSortState, action) => {
    switch(action.type) {
        case actions.INITIAL_SORT:
            return initialSortState
        case actions.SELECT_SORT:
            var { headIndex, buttonIndex } = action
            return {headIndex, buttonIndex}
        default:
            return sort_state
    }
}

const initialSearchState = {
    searchWord: "",
}

const search_state = (search_state = initialSearchState, action) => {
    switch(action.type) {
        case actions.INITIAL_SEARCH:
            return search_state
        case actions.SET_SEARCH_WORD:
            var { searchWord } = action
            return {
                searchWord
            }
        default:
            return search_state
    }
}

const initialAlertState = {
    messages: []
}
const alert_state = (alert_state = initialAlertState, action) => {
    switch(action.type) {
        case actions.DEL_ALERT:
            return {...alert_state, messages:(alert_state.messages.slice(1))}
        case actions.ADD_ALERT:
            return {...alert_state, messages:[...alert_state.messages, action.message]}
        default:
            return alert_state
    }
}


const country_reducer = combineReducers({
    country_state,
    sort_state,
    search_state,
    alert_state,
})
    
export default country_reducer
