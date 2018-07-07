import React from 'react'
import { connect } from 'react-redux'
import { AlertList } from 'components'
import { get_articles } from '../store/actions'


const mapStateToProps = (state) => ({
    alert_state: state.alert_state
})
const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)((props)=>(<AlertList {...props} />))
