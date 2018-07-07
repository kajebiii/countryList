import React, { PropTypes, Fragment } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Input from './Input'
import { koreanHead, englishHead, buttonList } from './constValue'

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
  shouldComponentUpdate(nextProps, nextState) {
    let isSame = true
    for(let ix in englishHead) {
      let field = englishHead[ix]
      if(nextProps[field] !== this.props[field]) isSame = false
    }
    return !isSame
  }
  render(){
    var { click_cancle, action_modify_country, action_delete_country, country, select, children, ...props } = this.props
    if(select === false)
      return (
        <Fragment {...props} >
          <div className="table-cell">{country.code}</div>
          <div className="table-cell">{country.continent}</div>
          <div className="table-cell">{country.name}</div>
          <div className="table-cell">{country.capital}</div>
          <div className="table-cell">{country.phone}</div>
          <div className="table-cell"></div>
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
          <div className="table-cell"><Input type="text" placeholder="code" onKeyDown={this.keyPress} defaultValue={country.code} innerRef={(ref) => {this.code = ref}}></Input></div>
          <div className="table-cell"><Input type="text" placeholder="continent" onKeyDown={this.keyPress} defaultValue={country.continent} innerRef={(ref) => {this.continent = ref}}></Input></div>
          <div className="table-cell"><Input type="text" placeholder="name" onKeyDown={this.keyPress} defaultValue={country.name} innerRef={(ref) => {this.name = ref}}></Input></div>
          <div className="table-cell"><Input type="text" placeholder="capital" onKeyDown={this.keyPress} defaultValue={country.capital} innerRef={(ref) => {this.capital = ref}}></Input></div>
          <div className="table-cell"><Input type="text" placeholder="phone" onKeyDown={this.keyPress} defaultValue={country.phone} innerRef={(ref) => {this.phone = ref}}></Input></div>
          <div className="table-cell">
            <button onClick={()=>{this.send_modify_country(), click_cancle()} }>수정</button>
            <button onClick={()=>send_delete_country()}>삭제</button>
            <button onClick={()=>click_cancle()}>취소</button>
          </div>
          {children}
        </Fragment>
      )
    }
  }
}

export default Country
