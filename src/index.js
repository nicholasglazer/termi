import React, { useRef, useEffect, useState } from 'react'
import s from '@emotion/styled'
import { help, cd, ls, showHistory, clear, echo, whoami } from './commandsHandler'


const Termi = (props) => {
  const pathname = props.history.location.pathname
  // Initial data from localStorage
  // should be placed before useState()
  const initialTerminalState = useEffect(() => {
    setTerminalState(
      JSON.parse(window.localStorage.getItem('terminalState')) || []
    )
  }, [])
  const initialPromptState = useEffect(() => {
    setPromptState(JSON.parse(window.localStorage.getItem('promptState')) || [])
  }, [])
  const initialPathState = useEffect(() => {
    setPathState(JSON.parse(window.localStorage.getItem('pathState')) || [])
  }, [])

  // UseState hooks
  const [terminalState, setTerminalState] = useState(initialTerminalState)
  const [promptState, setPromptState] = useState(initialPromptState)
  const [pathState, setPathState] = useState(initialPathState)
  const [promptInput, setPromptInput] = useState('')

  // UseRef hooks
  const terminalWrapper = useRef(null)
  const prompt = useRef(null)

  // UseEffect hooks
  // calling whoami() from the body because useEffect can't be called outside the body of the component function
  const userData = whoami()
  // focus on terminal after component did mount
  useEffect(() => handleClick(), [props.history])
  // when typing or pressing enter scroll down to the very bottom
  useEffect(() => {
    terminalWrapper.current.scrollTop = terminalWrapper.current.scrollHeight - terminalWrapper.current.clientHeight
  })
  // save the state of the terminal to the localStorage, could be cleaned with 'clear' command
  useEffect(() => {
    window.localStorage.setItem('terminalState', JSON.stringify(terminalState))
  }, [terminalState])
  // propmt state using here to make 'history' command persistant after 'clear' command
  useEffect(() => {
    window.localStorage.setItem('promptState', JSON.stringify(promptState))
  }, [promptState])
  // save the state of the path to the localStorage, could be cleaned with 'clear' command
  useEffect(() => {
    window.localStorage.setItem('pathState', JSON.stringify(pathState))
  }, [pathState])

  // Handlers
  // focus input once terminal wrapper clicked
  const handleClick = () => {
    prompt.current.focus()
  }
  // terminal input change handler
  const handleChange = (e) => {
    setPromptInput(`${e.target.value}`)
  }
  // terminal input submit handler used for managing state for now
  const handleSubmit = (e) => {
    e.preventDefault()
    // output receives command output, it could be object, array or string
    // and return whatever cmd function may return, usually string
    const output = readInstruction(promptInput)
    if (output === 'clear') {
      // a way to make localStorage to be cleared. localStorage.clear() will not work because it's hydrated initially
      setPathState([])
      setTerminalState([])
    } else {
      setTerminalState([...terminalState, [promptInput, output]])
      setPathState([...pathState, pathname])
    }
    setPromptState([...promptState, promptInput])
    setPromptInput('')
  }

  // Commands
  const readInstruction = (prompt) => {
    const instruction = prompt.split(' ')[0] || ''
    const arg = prompt.split(' ')[1] || ''
    // TODO args [...args]
    switch (instruction) {
      case '?':
      case 'help':
        return help()
      case 'cd':
        setPathState([...pathState, pathname])
        return cd(arg, props.history)
      case 'history':
        return showHistory()
      case 'clear':
        return clear()
      case 'ls':
        return ls(props.routes)
      case 'echo':
        return echo(arg)
      case 'whoami':
        return userData
      default:
        return `bsh: command not found: ${prompt}`
    }
  }

  // Terminal divided by 2 parts, PromptOutputWrapper and PromptInputWrapper componetns accordingly
  return (
    <div>
    <Wrapper ref={terminalWrapper} onClick={handleClick}>
      {
        terminalState ? terminalState.map((v,i) => {
          const instruction = v[0]
          const output = v[1]
          let isError = false;
          if (typeof output === 'string' && output.substr(0,3) === 'bsh') isError = true
          return (
            // PromptOutputWrapper contains all the terminal output as a hydrated state from localStorage
            <PromptOutputWrapper key={i}>
              <InstructionInput>
                <PromptSymbol isError={isError}>
                  {`~${pathState[i]}>`}
                </PromptSymbol>
                <div>{instruction}</div>
              </InstructionInput>
              <InstructionOutput>
                {
                  // use double ternary operator here to figure out if the output is a string, object or array to display different components
                  typeof output === 'string'
                  // Simlpe output for the string
                  ? (<StringOutput>{output}</StringOutput>)
                  : Array.isArray(output)
                  ?
                  // Array is been using by two commands for now history() and ls(), simply checking if the first letter is a number, if not put a nextjs link component
                  (
                    <ArrayOutput>
                      {
                        output.map(v =>
                          {
                            return !Number.isInteger(parseInt(v.substring(0,1)), 10) ? (<a key={v} href={v}>{v}</a>) : (<div>{v}</div>)
                          }
                        )
                      }
                    </ArrayOutput>
                  )
                  :
                  // Object is been using for help() and whoami() component
                  (
                    <ObjectOutput>
                      {
                        Object.keys(output).map((v,i) => (
                          <div key={i}>
                            <div>{v}</div>
                            <div>{output[v]}</div>
                          </div>
                        ))
                      }
                    </ObjectOutput>
                  )
                }
              </InstructionOutput>
            </PromptOutputWrapper>
          )
        })
        :
        // return an empty array if !terminalState
        []
      }
      <PromptInputWrapper onSubmit={handleSubmit} >
        {
          pathname === `/`
          ? <PromptSymbol>{'~>'}</PromptSymbol>
          : <PromptSymbol>~{window.location.pathname}></PromptSymbol>
        }
        <PromptInput onChange={handleChange} ref={prompt} value={promptInput} />
      </PromptInputWrapper>
    </Wrapper>
    </div>
  )
}

const ObjectOutput = s.div`
width: 100%;
> div {
  display: flex;
  > div {
    &:first-of-type {
      flex: 0 20%;
    }
    &:last-of-type {
      flex: 1;
    }
  }
}
`
const ArrayOutput = s.div`
a {
padding-right: 12px;
color: #00ffff;
}
`
const StringOutput = s.div``

const InstructionOutput = s.div`
`
const PromptSymbol = s.span`
word-break: normal;
padding-right: 8px;
color: ${ props => props.isError ? 'red' : '#50fa7b' };
height: 20px;
`
const InstructionInput = s.div`
flex: 0 100%;
display: flex;
`
const PromptInput = s.input`
background: transparent;
border: none;
padding: 0;
margin: 0;
height: 20px;
width: 100%;
color: #f5f5f5;
  &:focus {
    outline: none;
  }
`

const PromptInputWrapper = s.form`
display: flex;
align-items: center;
margin-top: 4px;
`

const PromptOutputWrapper = s.div`
z-index: 10;
display: flex;
flex-wrap: wrap;
color: white;
text-shadow: 0px 1px 2px rgba(0,0,0, 1);
> div {
margin: 1px;
width: 100%;
}
`
const Wrapper = s.div`
flex: 1;
display: flex;
flex-direction: column;
min-width: 50%;
padding: 20px;
background: #1d1f21;
overflow: auto;
word-break: break-all;
&::-webkit-scrollbar {
    width: 1em;
    background-color: #f2f3f5;
}
&::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 4px rgba(0,0,0, .14);
}
&::-webkit-scrollbar-thumb {
  background-color: #1b1f21;
  outline: 1px solid slategrey;
}
`

export default Termi
