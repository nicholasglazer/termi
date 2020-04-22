import React from "react"
import {
  Router,
  Switch,
  Route
} from "react-router-dom"
import s from '@emotion/styled'
import Termi from 'termi'
import { createBrowserHistory } from 'history'
import Install from './Install'
import Doc from './Doc'
import About from './About'

const browserHistory = createBrowserHistory({forceRefresh: true})

const routes = ['/', '/doc', '/about']

export default function App() {
  return (
    <Router history={browserHistory}>
      <Wrapper>
        <Termi history={browserHistory} routes={routes} />
        <Switch>
          <Route exact path="/">
            <Install />
          </Route>
          <Route path="/doc">
            <Doc />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </Wrapper>
      <style jsx global>
        {`
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
          sans-serif;
                 -webkit-font-smoothing: antialiased;
                 -moz-osx-font-smoothing: grayscale;
        }
        code {
          font-family: Hack, source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
          monospace;
        }
        `}
      </style>
    </Router>
  );
}

const Wrapper = s.div`
 a {
   text-decoration: none;
   padding: 4px 4px 0 0;
 }
 background: #f5f6f7;
 display: flex;
 height: 100vh;
 > div {
   flex: 1;
   display: flex;
 }
`
