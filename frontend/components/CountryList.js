import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import CountryTbody from './CountryTbody'
import Input from './Input'
import { koreanHead, englishHead, buttonList } from './constValue'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const HoverButton = styled.button`
  &:hover {
    background-color: #bdf;
  }
`
const SelectButton = styled.button`
  background-color: #fb9;
`

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
    var { country_state, sort_state, search_state, action_set_search_word, action_initial_all, action_add_country, children, ...props } = this.props
    let searchWord
    const send_set_search_word = () => {
      action_set_search_word(searchWord.value)
    }
    let code, continent, name, capital, phone
    const send_add_country = () => {
      action_add_country(code.value, continent.value, name.value, capital.value, phone.value)
    }
    const send_initial_all = () => {
      action_initial_all()
    }
    let countries = (Object.keys(country_state)).map( (code) => ({...country_state[code], code:code}))
    countries = countries.filter(country => {
      for(let i=0; i<koreanHead.length; i++) if(country[englishHead[i]].includes(search_state.searchWord)) return true
      return false
    })
    countries.sort(function(country_0, country_1) {
      let multi = 1
      let field = englishHead[sort_state.headIndex]
      if(buttonList[sort_state.buttonIndex] == 'v') multi = -1
      let first_comp = multi * ( (country_0[field]<country_1[field] ? -1 : 0) + (country_1[field]<country_0[field] ? +1 : 0) )
      if(first_comp != 0) return first_comp
      for(var ix in englishHead) {
        if(ix == sort_state.headIndex) continue;
        let other_field = englishHead[ix]
        let first_comp = multi * ( (country_0[other_field]<country_1[other_field] ? -1 : 0) + (country_1[other_field]<country_0[other_field] ? +1 : 0) )        
        if(first_comp != 0) return first_comp
      }
      return 0
    })
    return (
      <Wrapper {...props}>
        <button onClick={send_initial_all}>전체 초기화</button>
        <hr/>
        <div>
          <Input type="text" placeholder="searchWord" innerRef={(ref) => {searchWord = ref;}}></Input>
          <button onClick={send_set_search_word}>검색하기</button>
        </div>
        <hr/>
        <Input type="text" placeholder="code" innerRef={(ref) => {code = ref;}}></Input>
        <Input type="text" placeholder="continent" innerRef={(ref) => {continent = ref;}}></Input>
        <Input type="text" placeholder="name" innerRef={(ref) => {name = ref;}}></Input>
        <Input type="text" placeholder="capital" innerRef={(ref) => {capital = ref;}}></Input>
        <Input type="text" placeholder="phone" innerRef={(ref) => {phone = ref;}}></Input>
        <button onClick={send_add_country}>추가</button>
        <hr/>
        <table style={{'text-align': 'center'}} border={1}>
          <thead><tr>
            {(Array.from(new Array(koreanHead.length),(val,index)=>index)).map( (headIndex) => 
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
            <th>
              변경
            </th>
          </tr></thead>
        </table>
        <CountryTbody countries={countries}/>
        {children}
      </Wrapper>
    )
  }
}

export default CountryList
