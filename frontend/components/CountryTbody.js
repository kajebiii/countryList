import React, { PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Country from '../containers/Country'
import { koreanHead, englishHead, buttonList } from './constValue'

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

let compareFunction = (country_0, country_1, sort_state) => {
  if(country_0 === country_1) return 0
  if(country_0 === undefined) return -1
  if(country_1 === undefined) return +1
  let multi = (buttonList[sort_state.buttonIndex] == '^' ? 1 : -1)
  let field = englishHead[sort_state.headIndex]
  let first_comp = multi * ( (country_0[field] < country_1[field] ? -1 : 0) + (country_1[field] < country_0[field] ? +1 : 0) )
  if(first_comp != 0) return first_comp
  for(var ix in englishHead) {
    if(ix == sort_state.headIndex) continue;
    let other_field = englishHead[ix]
    let first_comp = multi * ( (country_0[other_field]<country_1[other_field] ? -1 : 0) + (country_1[other_field]<country_0[other_field] ? +1 : 0) )        
    if(first_comp != 0) return first_comp
  }
  return 0
}
let getCountry = (countries, index) => {
  if(countries.length === 0) return undefined
  if(countries.length < index) return getCountry(countries, countries.length-1)
  return countries[index]
}

class CountryTbody extends React.Component {
  constructor( props ){
    super(props)
    this.state = {lastCountry: undefined, requestSent: false}
    this.country_code = ""
    this.row_click = this.row_click.bind(this)
    this.click_cancle = this.click_cancle.bind(this)
    this.initState = this.initState.bind(this)
    this.findScroll = this.findScroll.bind(this)
    this.doQuery = this.doQuery.bind(this)
    this.handleOnScroll = this.handleOnScroll.bind(this)
    this.querySearchResult = this.querySearchResult.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if(this.state.lastCountry === undefined) this.initState(nextProps)
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleOnScroll);
    this.initState(this.props)
  }
  initState(props) {
    this.setState({lastCountry: getCountry(this.props.countries, 40), requestSent: true})
    setTimeout(this.findScroll, 2000)
  }
  findScroll() {
    let { sort_state, countries } = this.props
    var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
    var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight
    var clientHeight = document.documentElement.clientHeight || window.innerHeight
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight
    var hasScroll = scrollHeight > clientHeight
    if(hasScroll || compareFunction(this.state.lastCountry, countries[countries.length-1], sort_state) >= 0 ) {
      this.setState({requestSent: false})
      return
    }
    let ix = 0
    for(let i=0; i<countries.length; i++) if(compareFunction(this.state.lastCountry, countries[i], sort_state) < 0) {ix = i; break;}
    this.setState((prevState, props) => ({
      lastCountry: getCountry(countries, ix+20-1), requestSent: true
    }))
    setTimeout(this.findScroll, 1000)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll);
  }
  handleOnScroll() {
    // http://stackoverflow.com/questions/9439725/javascript-how-to-detect-if-browser-window-is-scrolled-to-bottom
    var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
    var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight
    var clientHeight = document.documentElement.clientHeight || window.innerHeight
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight
    if (scrolledToBottom) this.querySearchResult();
  }
  querySearchResult() {
    let { sort_state, countries } = this.props
    if (this.state.requestSent || compareFunction(this.state.lastCountry, countries[countries.length-1], sort_state) >= 0) return;
    this.setState({requestSent: true})
    setTimeout(this.doQuery, 1000)
  }
  doQuery() {
    setTimeout(this.findScroll, 1000)

    this.setState((prevState, props) => {
      let ix = 0
      for(let i=0; i<props.countries.length; i++) if(compareFunction(prevState.lastCountry, props.countries[i], props.sort_state) < 0) {ix = i; break;}
      return {lastCountry: getCountry(props.countries, ix+20-1), requestSent: false}
    })
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
    var { countries, sort_state, children, ...props } = this.props
    return (
      <Wrapper {...props}>
        <ReactCSSTransitionGroup className="table" style={{'textAlign': 'center'}}
          transitionName="country-row"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}>

          {countries.map( (country) => {
            if(compareFunction(country, this.state.lastCountry, sort_state) > 0) return
            return (country.code === this.country_code ?
            <SelectTr className="table-row" key={country.code}>
              <Country 
                click_cancle={this.click_cancle} 
                country={country} 
                select={true}
              />
            </SelectTr>:
            <HoverTr className="table-row" key={country.code} onClick={()=>this.row_click(country.code)}>
              <Country country={country} select={false}/>
            </HoverTr>)
          })}
        </ReactCSSTransitionGroup>
        {(() => {
          if (this.state.requestSent) {
            return(
              <h1 style={{'textAlign': 'center'}}>LOADING</h1>
            );
          }
        })()}
      </Wrapper>
    )
  }
}

export default CountryTbody
