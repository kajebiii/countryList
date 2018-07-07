import React from 'react'
import { connect } from 'react-redux'
import CountryList from '../components/CountryList'
import { set_search_word, initial_country, add_check_country, select_sort } from '../store/actions'


const mapStateToProps = (state) => ({
    country_state: state.country_state,
    sort_state: state.sort_state,
    search_state: state.search_state,
})
const mapDispatchToProps = (dispatch) => {
    return {
        action_set_search_word: (serachWord) => {
            dispatch(set_search_word(serachWord))
        },
        action_initial_country: () => {
            dispatch(initial_country())
        },
        action_add_country: (code, continent, name, capital, phone) => {
            dispatch(add_check_country(code, continent, name, capital, phone))
        },
        action_select_sort: (headIndex, buttonIndex) => {
            dispatch(select_sort(headIndex, buttonIndex))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)((props)=>(<CountryList {...props} />))
