export const INITIAL_COUNTRY = 'INITIAL_COUNTRY'
export const SET_COUNTRY = 'SET_COUNTRY'
export const ADD_COUNTRY = 'ADD_COUNTRY'
export const DELETE_COUNTRY = 'DELETE_COUNTRY'
export const initial_country = () => ({type: INITIAL_COUNTRY})
export const set_country = (country_dictionary) => ({type: SET_COUNTRY, country_dictionary})
export const add_country = (code, continent, name, capital, phone) => ({type: ADD_COUNTRY, code, continent, name, capital, phone})
export const delete_country = (code) => ({type: DELETE_COUNTRY, code})
