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
    this.state = {data: [], requestSent: false}
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
    this.initState(nextProps)
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleOnScroll);
    this.initState(this.props)
  }
  initState(props) {
    console.log("initState")
    this.setState({data: props.countries.slice(0, 0), requestSent: true})
    setTimeout(this.findScroll, 4000)
  }
  findScroll() {
    var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
    var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight
    var clientHeight = document.documentElement.clientHeight || window.innerHeight
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight
    var hasScroll = scrollHeight > clientHeight
    if(hasScroll || this.state.data.length === this.props.countries.length) {
      this.setState({requestSent: false})
      return
    }
    this.setState((prevState, props) => ({
      data: [...prevState.data, ...props.countries.slice(prevState.data.length, prevState.data.length+20)], requestSent: true
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
    if (this.state.requestSent) return;
    this.setState({requestSent: true})
    setTimeout(this.doQuery, 1000)
  }
  doQuery() {
    this.setState((prevState, props) => ({
      data: [...prevState.data, ...props.countries.slice(prevState.data.length, prevState.data.length+20)], requestSent: false
    }))
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

          {this.state.data.map( (country) => 
            country.code === this.country_code ?
            <SelectTr className="table-row" key={country.code}>
              <Country 
                click_cancle={this.click_cancle} 
                country={country} 
                select={true}
              />
            </SelectTr>:
            <HoverTr className="table-row" key={country.code} onClick={()=>this.row_click(country.code)}>
              <Country country={country} select={false}/>
            </HoverTr>
          )}
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
