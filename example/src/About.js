import React from 'react'
import s from '@emotion/styled'

const  About = () => {
  return (
    <Wrapper>
      <Fork>
        <a href="https://github.com/nicholasglazer/termi" rel="noopener noreferrer" target="_blank" rel="noopener noreferrer">Fork me on Github</a>
      </Fork>
      <Content>
        <h2>Why?</h2>
        <p>First version was written using MVI architecture with react and react-cycle libraries in 2016 as a proof-of-concept. Now I decided to move further making a component that can actually be useful.</p>

        <p>
          There are some available usecases for this component.
          You can use it as a portfolio feature like I do <a href="https://nicholasglazer.com">nicholasglazer.com</a>
        </p>
        <p>
          You can also use it in your development.
          Or if you're terminal addicted and can't leave without command line like me, you may use this lib to make your life little bit easier navigating across the website while in development.
        </p>
        <p>
          I'm also plannig to add more cool features in the future.
          Big respect for the contributors, they will be displayed on the github README.md.
        </p>
        <p>
          If you have any propositions, feel free to write an <a href="https://github.com/nicholasglazer/termi/issues" target="_blank" rel="noopener noreferrer">issue</a> or feature request.
        </p>
      </Content>
      <Footer>{`Made with <3 by Nicholas Glazer`}</Footer>
    </Wrapper>
  );
}

const Wrapper = s.div`
margin: 24px;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
font-size: 17px;
`

const Content = s.div`
flex: 1;
margin-top: 24px;
padding: 0 48px;
> h2 {
margin-bottom: 48px;
}
`
const Footer = s.div`
align-self: center;
`
const Fork = s.div`
align-self: flex-end;
font-size: 18px;
font-weight: 700;
> a {
color: #1d1f21;
}
`

export default About
