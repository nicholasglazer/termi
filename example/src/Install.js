import React from "react"
import s from '@emotion/styled'
import logo from './termilogo.png'
import { Link } from "react-router-dom"

const Use = () => {
  return (
    <Wrapper>
      <Fork>
        <a href="https://github.com/nicholasglazer/termi" target="_blank" rel="noopener noreferrer">Fork me on Github</a>
      </Fork>
      <div>
        <img src={logo} alt="logo" />
        <Title>Termi</Title>
      </div>
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
`
const Footer = s.div`
display: flex;
flex-direction: column;
> div {
margin-bottom: 20px;
display: flex;
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
const Title = s.h1`
font-size: 36px;
text-align: center;
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
> a {
color: #1d1f21;
}
`
export default Use
