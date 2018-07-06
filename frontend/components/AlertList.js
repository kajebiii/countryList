import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Country from './Country'
import Input from './Input'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

const AlertList = ({ alert_state, ...props }) => {
  return (
    <div {...props} style={{'position': 'fixed', 'bottom': '0', 'right': '0'}}>
      {(alert_state.messages).map( (message, index) =>      
        <div style={{
          'backgroundColor': '#f0f0f0f0',
          'width': '320px', 
          'padding': '24px', 
          'margin': '12px', 
          'border': '1px solid #aaa', 
          'color': '#333', 
          'borderRadius': '.5rem', 
          'textAlign': 'center'
        }} key={index}>{message}</div>
      )}
    </div>
  )
}

export default AlertList
