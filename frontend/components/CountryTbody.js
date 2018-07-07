import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Country from '../containers/Country'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

const HoverTr = styled.tr`
  &:hover {
    background-color: #bdf;
  }
`

const SelectTr = styled.tr`
  background-color: #fdb;
`

class CountryTbody extends React.Component {
  constructor( props ){
    super(props)
    this.country_code = ""
    this.row_click = this.row_click.bind(this)
    this.click_cancle = this.click_cancle.bind(this)
  }
  click_cancle() {
    this.country_code = ""
    this.forceUpdate()
  }
  row_click(country_code) {
    this.country_code = country_code;
    this.forceUpdate()
  }
  render(){
    var { countries, children, ...props } = this.props
    return (
      <tbody {...props}>
        {countries.map( (country) => 
          (country.code === this.country_code) ?
          (
          <SelectTr key={country.code}>
            <Country 
              click_cancle={this.click_cancle} 
              country={country} 
              select={true}
            />
          </SelectTr>
          ) 
          :
          (
          <HoverTr key={country.code} onClick={()=>this.row_click(country.code)}>
            <Country country={country} select={false}/>
          </HoverTr>
          )
        )}
      </tbody>
    )
  }
}

export default CountryTbody
