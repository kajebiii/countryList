import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import CountryTbody from './CountryTbody'
import Input from './Input'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

const HoverButton = styled.button`
  &:hover {
    background-color: #bdf;
  }
`
const SelectButton = styled.button`
  background-color: #fb9;
`
const koreanHead = ["코드", "대륙", "이름", "수도", "번호"]
const englishHead = ["code", "continent", "name", "capital", "phone"]
const buttonList = ["^", "v"]

class CountryList extends React.Component {
  constructor( props ){
    super(props)
    this.button_click = this.button_click.bind(this)
  }
  button_click(headIndex, buttonIndex) {
    var { action_select_sort } = this.props
    action_select_sort(headIndex, buttonIndex)
  }
  render(){
    var { country_state, sort_state, action_initial_country, action_add_country, children, ...props } = this.props
    let code, continent, name, capital, phone
    const send_add_country = () => {
      action_add_country(code.value, continent.value, name.value, capital.value, phone.value)
    }
    const send_initial_country = () => {
      action_initial_country()
    }
    let countries = (Object.keys(country_state)).map( (code) => ({...country_state[code], code:code}))
    countries.sort(function(country_0, country_1) {
      var multi = 1
      var field = englishHead[sort_state.headIndex]
      if(buttonList[sort_state.buttonIndex] == 'v') multi = -1
      return multi * (country_0[field].localeCompare(country_1[field]))
    });
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
            {(Array.from(new Array(5),(val,index)=>index)).map( (headIndex) => 
              <th key={headIndex}>
                {koreanHead[headIndex]}
                <br/>
                {(Array.from(new Array(2),(val,index)=>index)).map( (buttonIndex) => 
                  (headIndex == sort_state.headIndex && buttonIndex == sort_state.buttonIndex ?
                    <SelectButton key={buttonIndex} onClick={()=>this.button_click(headIndex, buttonIndex)}>
                      {buttonList[buttonIndex]}
                    </SelectButton>
                    :
                    <HoverButton key={buttonIndex} onClick={()=>this.button_click(headIndex, buttonIndex)}>
                    {buttonList[buttonIndex]}
                    </HoverButton>
                  )
                )}
              </th>
            )}
          </tr></thead>
          <CountryTbody countries={countries}/>
        </table>
        {children}
      </Wrapper>
    )
  }
}

export default CountryList
