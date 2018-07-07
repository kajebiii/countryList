import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { koreanHead, englishHead, buttonList } from './constValue'

let SearchCountryForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit} style={{'textAlign': 'center'}}>
      <div>
        <Field name="searchWord" component="input" placeholder="searchWord" type="text" style={{'textAlign': 'center'}}/>
      </div>
      <button type="submit">검색하기 (Case Sensitive)</button>
    </form>
  )
}

SearchCountryForm = reduxForm({
  form: 'searchCountry'
})(SearchCountryForm)

export default SearchCountryForm