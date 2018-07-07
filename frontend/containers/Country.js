import React from 'react'
import { connect } from 'react-redux'
import Country from '../components/Country'
import { modify_check_country, delete_country } from '../store/actions'


const mapStateToProps = (state) => ({
})
const mapDispatchToProps = (dispatch) => {
    return {
        action_modify_country: (beforeCode, code, continent, name, capital, phone) => {
            dispatch(modify_check_country(beforeCode, code, continent, name, capital, phone))
        },
        action_delete_country: (code) => {
            dispatch(delete_country(code))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)((props)=>(<Country {...props} />))
