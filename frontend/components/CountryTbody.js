import React, { PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Country from '../containers/Country'

const Wrapper = styled.div`
font-family: ${font('primary')};
color: ${palette('grayscale', 0)};

.table {
  display: table;
}
.table-row {
  display: table-row;
}
.table-cell {
  display: table-cell;
}

.country-row-enter {
opacity: 0.01;
}

.country-row-enter.country-row-enter-active {
opacity: 1;
transition: opacity 500ms ease-in;
}

.country-row-leave {
opacity: 1;
}

.country-row-leave.country-row-leave-active {
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
        <ReactCSSTransitionGroup className="table" style={{'textAlign': 'center'}}
          transitionName="country-row"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}>

          {countries.map( (country) => 
            (country.code === this.country_code) ?
            (
            <SelectTr className="table-row" key={country.code}>
              <Country 
                click_cancle={this.click_cancle} 
                country={country} 
                select={true}
              />
            </SelectTr>
            ) 
            :
            (
            <HoverTr className="table-row" key={country.code} onClick={()=>this.row_click(country.code)}>
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
