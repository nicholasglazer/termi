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
  const useViewport = () => {
    const [width, setWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
      const handleWindowResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    // Return the width so we can use it in our components
    return { width };
  }

  const { width } = useViewport()
  const breakpoint = 768
  return (
    <Router history={browserHistory}>
      <Wrapper breakpoint={breakpoint} width={width}>
        <Termi history={browserHistory} routes={routes} />
        <Switch>
          <Route exact path="/">
            <Install width={width} breakpoint={breakpoint}/>
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
 flex-direction: ${props => props.width < props.breakpoint ? 'column' : 'row' };
 height: 100vh;
 > div:first-of-type {
   flex: 1;
   display: flex;
   order: ${props => props.width < props.breakpoint ? '2' : '1'};
   ${props => props.width < props.breakpoint ? 'max-height: 200px;' : ''}
 }
 > div:last-of-type {
   flex: 1;
   display: flex;
   order: ${props => props.width < props.breakpoint ? '1' : '2'};
   overflow: auto;
 }
`
