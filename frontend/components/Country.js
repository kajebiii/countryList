import React, { PropTypes, Fragment } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Input from './Input'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`
class Country extends React.Component {
  constructor( props ){
    super(props)
    this.keyPress = this.keyPress.bind(this)
    this.send_modify_country = this.send_modify_country.bind(this)
  }
  send_modify_country = () => {
    var { click_cancle, action_modify_country, action_delete_country, country, select, children, ...props } = this.props
    action_modify_country(country.code, this.code.value, this.continent.value, this.name.value, this.capital.value, this.phone.value)
  }
  keyPress(e){
    var { click_cancle, action_modify_country, action_delete_country, country, select, children, ...props } = this.props
    if(e.keyCode == 13){
       //console.log('value', e.target.value);
       this.send_modify_country()
       click_cancle()
    }
  }
  render(){
    var { click_cancle, action_modify_country, action_delete_country, country, select, children, ...props } = this.props
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
      //let code, continent, name, capital, phone
      const send_delete_country = () => {
        action_delete_country(country.code)
      }
      return (
        <Fragment {...props} >
          <td><Input type="text" placeholder="code" onKeyDown={this.keyPress} defaultValue={country.code} innerRef={(ref) => {this.code = ref;}}></Input></td>
          <td><Input type="text" placeholder="continent" onKeyDown={this.keyPress} defaultValue={country.continent} innerRef={(ref) => {this.continent = ref;}}></Input></td>
          <td><Input type="text" placeholder="name" onKeyDown={this.keyPress} defaultValue={country.name} innerRef={(ref) => {this.name = ref;}}></Input></td>
          <td><Input type="text" placeholder="capital" onKeyDown={this.keyPress} defaultValue={country.capital} innerRef={(ref) => {this.capital = ref;}}></Input></td>
          <td><Input type="text" placeholder="phone" onKeyDown={this.keyPress} defaultValue={country.phone} innerRef={(ref) => {this.phone = ref;}}></Input></td>
          <td>
            <button onClick={()=>{this.send_modify_country(), click_cancle()} }>수정</button>
            <button onClick={()=>send_delete_country()}>삭제</button>
            <button onClick={()=>click_cancle()}>취소</button>
          </td>
          {children}
        </Fragment>
      )
    }
  }
}

export default Country
