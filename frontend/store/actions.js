export const INITIAL_ALL = 'INITIAL_ALL'
export const initial_all = () => ({type: INITIAL_ALL})

export const INITIAL_COUNTRY = 'INITIAL_COUNTRY'
export const initial_country = () => ({type: INITIAL_COUNTRY})
export const INITIAL_SORT = 'INITIAL_SORT'
export const initial_sort = () => ({type: INITIAL_SORT})
export const INITIAL_SEARCH = 'INITIAL_SEARCH'
export const initial_search = () => ({type: INITIAL_SEARCH})

export const SET_COUNTRY = 'SET_COUNTRY'
export const ADD_CHECK_COUNTRY = 'ADD_CHECK_COUNTRY'
export const ADD_COUNTRY = 'ADD_COUNTRY'
export const DELETE_COUNTRY = 'DELETE_COUNTRY'
export const MODIFY_CHECK_COUNTRY = 'MODIFY_CHECK_COUNTRY'
export const MODIFY_COUNTRY = 'MODIFY_COUNTRY'
export const set_country = (country_dictionary) => ({type: SET_COUNTRY, country_dictionary})
export const add_check_country = (code, continent, name, capital, phone) => ({type: ADD_CHECK_COUNTRY, code, continent, name, capital, phone})
export const add_country = (code, continent, name, capital, phone) => ({type: ADD_COUNTRY, code, continent, name, capital, phone})
export const delete_country = (code) => ({type: DELETE_COUNTRY, code})
export const modify_check_country = (beforeCode, code, continent, name, capital, phone) => ({type: MODIFY_CHECK_COUNTRY, beforeCode, code, continent, name, capital, phone})
export const modify_country = (beforeCode, code, continent, name, capital, phone) => ({type: MODIFY_COUNTRY, beforeCode, code, continent, name, capital, phone})


export const SET_SEARCH_WORD = 'SET_SEARCH_WORD'
export const set_search_word = (searchWord) => ({type: SET_SEARCH_WORD, searchWord})

export const SELECT_SORT = 'SELECT_SORT'
export const select_sort = (headIndex, buttonIndex) => ({type: SELECT_SORT, headIndex, buttonIndex})

export const DEL_ALERT = 'DEL_ALERT'
export const ADD_ALERT = 'ADD_ALERT'
export const SEND_ALERT = 'SEND_ALERT'
export const del_alert = () => ({type:DEL_ALERT})
export const add_alert = (message) => ({type:ADD_ALERT, message})
export const send_alert = (message) => ({type:SEND_ALERT, message})