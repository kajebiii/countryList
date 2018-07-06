import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Country from './Country'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

const CountryTbody = ({ countries, children, ...props }) => {
  return (
    <tbody>
      {countries.map( (country) => <Country key={country.code} country={country}/>)}
    </tbody>
  )
}

export default CountryTbody
