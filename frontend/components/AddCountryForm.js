import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { koreanHead, englishHead, buttonList } from './constValue'

let AddCountryForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit} style={{'textAlign': 'center'}}>
      {englishHead.map( (head) => 
        <div key={head}>
          <Field name={head} component="Input" placeholder={head} type="text" style={{'textAlign': 'center'}}/>
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