import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import CountryTbody from './CountryTbody'
import Input from './Input'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

class CountryList extends React.Component {
  constructor( props ){
    super(props)
  }
  render(){
    var { country_state, action_initial_country, action_add_country, children, ...props } = this.props
    let code, continent, name, capital, phone
    const send_add_country = () => {
      action_add_country(code.value, continent.value, name.value, capital.value, phone.value)
    }
    const send_initial_country = () => {
      action_initial_country()
    }
    let countries = (Object.keys(country_state)).map( (code) => ({...country_state[code], code:code}))
    return (
      <Wrapper {...props}>
        <button onClick={send_initial_country}>초기화</button>
        <Input type="text" placeholder="code" innerRef={(ref) => {code = ref;}}></Input>
        <Input type="text" placeholder="continent" innerRef={(ref) => {continent = ref;}}></Input>
        <Input type="text" placeholder="name" innerRef={(ref) => {name = ref;}}></Input>
        <Input type="text" placeholder="capital" innerRef={(ref) => {capital = ref;}}></Input>
        <Input type="text" placeholder="phone" innerRef={(ref) => {phone = ref;}}></Input>
        <button onClick={send_add_country}>추가</button>
        <table>
          <thead><tr>
            <th>코드</th>
            <th>대륙</th>
            <th>이름</th>
            <th>수도</th>
            <th>번호</th>
          </tr></thead>
          <CountryTbody countries={countries}/>
        </table>
        {children}
      </Wrapper>
    )
  }
}

export default CountryList
