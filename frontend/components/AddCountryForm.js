import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { koreanHead, englishHead, buttonList } from './constValue'

let AddCountryForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      {englishHead.map( (head) => 
        <div key={head}>
          <label htmlFor={head}>{head}</label>
          <Field name={head} component="input" type="text" />
        </div>
      )}
      <button type="submit">추가</button>
    </form>
  )
}

AddCountryForm = reduxForm({
  form: 'addCountry'
})(AddCountryForm)

export default AddCountryForm