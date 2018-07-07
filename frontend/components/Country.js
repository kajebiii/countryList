import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

const Country = ({ country, children, ...props }) => {
  return (
    <tr {...props} >
      <td>{country.code}</td>
      <td>{country.continent}</td>
      <td>{country.name}</td>
      <td>{country.capital}</td>
      <td>{country.phone}</td>
      <td></td>
      {children}
    </tr>
  )
}

export default Country
