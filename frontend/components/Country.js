import React, { PropTypes, Fragment } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Input from './Input'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

const Country = ({ country, select, children, ...props }) => {
  if(select === false)
    return (
      <Fragment {...props} >
        <td>{country.code}</td>
        <td>{country.continent}</td>
        <td>{country.name}</td>
        <td>{country.capital}</td>
        <td>{country.phone}</td>
        <td></td>
        {children}
      </Fragment>
    )
  else{
    let code, continent, name, capital, phone
    return (
      <Fragment {...props} >
        <td><Input type="text" placeholder="code" defaultValue={country.code} innerRef={(ref) => {code = ref;}}></Input></td>
        <td><Input type="text" placeholder="continent" defaultValue={country.continent} innerRef={(ref) => {continent = ref;}}></Input></td>
        <td><Input type="text" placeholder="name" defaultValue={country.name} innerRef={(ref) => {name = ref;}}></Input></td>
        <td><Input type="text" placeholder="capital" defaultValue={country.capital} innerRef={(ref) => {capital = ref;}}></Input></td>
        <td><Input type="text" placeholder="phone" defaultValue={country.phone} innerRef={(ref) => {phone = ref;}}></Input></td>
        <td>
          <button>수정</button>
          <button>삭제</button>
        </td>
        {children}
      </Fragment>
    )
  }
}

export default Country
