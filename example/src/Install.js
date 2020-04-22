import React from "react"
import s from '@emotion/styled'
import logo from './termilogo.png'
import { Link } from "react-router-dom"

const Use = (props) => {
  const { width, breakpoint } = props
  return (
    <Wrapper width={width} breakpoint={breakpoint}>
      <Fork>
        <a href="https://github.com/nicholasglazer/termi" target="_blank" rel="noopener noreferrer">Fork me on Github</a>
      </Fork>
      <TitleWrapper>
        <img src={logo} alt="logo" />
        <Title width={width} breakpoint={breakpoint} >Termi</Title>
      </TitleWrapper>
      <h2>Manipulate your website with react based web terminal</h2>
      <Terminal>
        <TerminalText>
          <TerminalSymb>~></TerminalSymb><TerminalText>npm i termi</TerminalText>
        </TerminalText>
      </Terminal>
      <p>Component size: <b>18kb</b></p>
      <Footer>
        <div>
          <Link to="/doc">Read docs </Link>
          <span> to know more or try to enter</span>
          <div>cd doc</div>
          <span>in the terminal.</span>
        </div>
      </Footer>
    </Wrapper>
  );
}

const Wrapper = s.div`
margin: 24px;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
img {
width: ${props => props.width < props.breakpoint ? '64px' : '128px'};
margin-right: 10px;
}
`
const Footer = s.div`
display: flex;
flex-direction: column;
> div {
margin-bottom: 20px;
display: flex;
flex-wrap: wrap;
  a {
    padding: 4px 4px 0 0;
  }
  > div {
    background: #1b1f21;
    color: white;
    padding: 4px 8px;
    margin-right: 8px;
    border-radius: 4px;
  }
  > span {
    padding: 4px 8px 4px 0;
  }
}
`
const TitleWrapper = s.div`
display: flex;
align-items: center;
`
const Title = s.h1`
font-size: ${props => props.width < props.breakpoint ? '32px' : '60px'};
text-align: center;
margin: 0;
`
const Terminal = s.div`
display: flex;
align-items: center;
justify-content: center;
border-radius: 8px;
height: 100px;
width: 220px;
background: #1d1f21;
`
const TerminalSymb = s.span`
color: #50fa7b;
padding-right: 10px;
user-select: none;
`
const TerminalText = s.span`
color: #f4f6f7
`
const Fork = s.div`
align-self: flex-end;
font-size: 18px;
font-weight: 700;
margin-bottom: 12px;
> a {
color: #1d1f21;
}
`
export default Use
