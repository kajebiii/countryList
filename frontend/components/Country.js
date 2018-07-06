import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

const Country = ({ country, children, ...props }) => {
  return (
    <Wrapper {...props}>
      <table><tbody>
        <tr>
          <td>{country.code}</td>
          <td>{country.continent}</td>
          <td>{country.name}</td>
          <td>{country.capital}</td>
          <td>{country.phone}</td>
        </tr>
      </tbody></table>
      {children}
    </Wrapper>
  )
}

export default Country
