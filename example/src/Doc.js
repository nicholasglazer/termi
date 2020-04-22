import React from "react"
import s from '@emotion/styled'

const help = {
  'help, ?': '- Display the commands list in the terminal.',
  'cd': '- Move to the route. E.g.: "cd about", to move back "cd .." or "cd ..." to move 2 pages back, "cd ,," to move forward, no args "cd" leads to the "/"',
  'ls': '- ListWrapper of available paths',
  'history': '- History of the terminal input commands.',
  'clear': '- Remove terminal state.',
  'echo': '- Echoing input.',
  'whoami': '- Return your IP, city, coordinates and the dollar price.'
}
const properties = {
  'history: object': '- accepting location object from your react-router or from the window.location.',
  'routes: array': '- accepting array of strings e.g.: ["/", "/home", "/about"].',
  'positon: string': '- in development...',
  'size: string': '- in development...',
  'color: string': '- in development...',
  'font: string': '- in development...',
  'backgroud: string': '- in development...'
}

const Doc = () => {
  return (
    <Wrapper>
      <Fork>
        <a href="https://github.com/nicholasglazer/termi" target="_blank" rel="noopener noreferrer">Fork me on Github</a>
      </Fork>
      <TitleWrapper>
        <h2>Termi documentation</h2>
        <div>
          Termi is written using React and React Hooks
        </div>
      </TitleWrapper>
      <ListWrapper>
        <h4>You can use following commands:</h4>
        {
          Object.keys(help).map((k,i) => {
            return (
              <List key={i}>
                <CmdWrapper>
                  <Cmd>{k}</Cmd>
                </CmdWrapper>
                <Descr>{help[k]}</Descr>
              </List>
            )
          })
        }
      </ListWrapper>
      <ListWrapper>
        <h4>Properties:</h4>
        {
          Object.keys(properties).map((k,i) => {
            return (
              <List key={i}>
                <CmdWrapper>
                  <Cmd>{k}</Cmd>
                </CmdWrapper>
                <Descr>{properties[k]}</Descr>
              </List>
            )
          })
        }
      </ListWrapper>
    </Wrapper>
  );
}

const Fork = s.div`
align-self: flex-end;
font-size: 18px;
font-weight: 700;
> a {
color: #f1f2f3;
}
`
const TitleWrapper = s.div`
align-self: center;
text-align: center;
margin-bottom: 48px;
`
const List = s.li`
display: flex;
`
const ListWrapper = s.ul`
list-style-type: none;
`
const CmdWrapper = s.div`
min-width: 140px;
`
const Cmd = s.div`
background: #eee;
padding: 2px 4px;
margin: 2px 12px 2px 0;
border-radius: 2px;
color: #333;
height: fit-content;
width: fit-content;
`

const Descr = s.div`
`

const Wrapper = s.div`
padding: 24px;
border-left: 1px solid #444;
color: #f1f2f3;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
background: #1d1f21;
`

export default Doc

