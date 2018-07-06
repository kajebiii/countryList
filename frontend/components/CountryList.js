import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Country from './Country'
import Input from './Input'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

const CountryList = ({ country_state, action_initial_country, action_add_country, children, ...props }) => {
  let code, continent, name, capital, phone
  const send_add_country = () => {
    action_add_country(code.value, continent.value, name.value, capital.value, phone.value)
  }
  const send_initial_country = () => {
    action_initial_country()
  }
  return (
    <Wrapper {...props}>
      <button onClick={send_initial_country}>초기화</button>
      <Input type="text" placeholder="code" innerRef={(ref) => {code = ref;}}></Input>
      <Input type="text" placeholder="continent" innerRef={(ref) => {continent = ref;}}></Input>
      <Input type="text" placeholder="name" innerRef={(ref) => {name = ref;}}></Input>
      <Input type="text" placeholder="capital" innerRef={(ref) => {capital = ref;}}></Input>
      <Input type="text" placeholder="phone" innerRef={(ref) => {phone = ref;}}></Input>
      <button onClick={send_add_country}>추가</button>
      {(Object.keys(country_state)).map( (code) => <Country key={code} country={{...country_state[code], code:code}}/>)}
      {children}
    </Wrapper>
  )
}

export default CountryList
