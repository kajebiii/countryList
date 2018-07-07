import React, { PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Country from '../containers/Country'

const Wrapper = styled.div`
.example-enter {
opacity: 0.01;
}

.example-enter.example-enter-active {
opacity: 1;
transition: opacity 500ms ease-in;
}

.example-leave {
opacity: 1;
}

.example-leave.example-leave-active {
opacity: 0.01;
transition: opacity 300ms ease-in;
}
`

const HoverTr = styled.div`
  &:hover {
    background-color: #bdf;
  }
`

const SelectTr = styled.div`
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
      <Wrapper {...props}>
      <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
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
      </ReactCSSTransitionGroup>
      </Wrapper>
    )
  }
}

export default CountryTbody
