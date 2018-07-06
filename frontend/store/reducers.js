import * as actions from './actions';
import { combineReducers } from 'redux';

const initialCountryState = {
}
  
const country_state = (country_state = initialCountryState, action) => {
    switch(action.type) {
        case actions.SET_COUNTRY:
            return action.country_dictionary
        case actions.ADD_COUNTRY:
            return {...country_state, [action.code]: {capital:action.capital, name:action.name, continent:action.continent, phone:action.phone}}
        case actions.DELETE_COUNTRY:
            const delete_state = Object.assign({}, country_state)
            delete delete_state[action.code]
            return delete_state
        default:
            return country_state
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
    alert_state,
});
    
export default country_reducer;
