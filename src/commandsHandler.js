import { useEffect, useState } from 'react'

// Prompt help string to the user
export function help(arg) {
  return {
    'help, ?': '- Display terminal commands list.',
    'cd': '- Move to the route. E.g.: "cd about", to move back "cd .." or "cd ..." to move 2 pages back, "cd ,," to move forward, no args "cd" leads to the "/"',
    'ls': '- List of available paths',
    'history': '- History of the terminal input commands.',
    'clear': '- Remove terminal state.',
    'echo': '- Echoing input.',
    'whoami': '- Return your IP, city, coordinates and the dollar price.'
  }
}

// Move to the existing path e.g.: "/about"
export function cd(route = '/', h) {
  if (route === '/') {
    h.push(`/`)
  } else if (route === '..') {
    h.goBack()
  } else if (route === ',,') {
    h.goForward()
  } else if (route === '...') {
    h.go(-2)
  } else {
    h.push(`/${route.replace(/^\//, '')}`)
  }
  return `Observing page: ${h.location.pathname}`
}
// List of possible routes
// ls() is using to propmt existing routes as a clickable Link components
// accepts and return an array e.g. ['/', '/blog', '/about'] - these will be your real routes, if using nextjs, simply put every name from /pages directory
export function ls(arg) {
  // TODO extend ls() logit to return all possible routes automatically with react-router??
  return arg
}
// Show prompt history input
export function showHistory() {
  const arr = JSON.parse(localStorage.getItem('promptState'))
  const history = arr.map((v, i) => `${i + 1}  ${v}`)
  return history
}
// Clear terminal prompt
export function clear() {
  return 'clear'
}
// Echoing the input
export function echo(arg) {
  return arg
}
export function whoami() {
  const [ip, setIp] = useState({})
  async function fetchUrl() {
    const response = await fetch('https://www.geoplugin.net/json.gp')
    const json = await response.json()
    const data = {
      'ip': json.geoplugin_request,
      'from': `${json.geoplugin_city} ${json.geoplugin_countryCode}`,
      'coordinates': `lt: ${json.geoplugin_latitude} lg: ${json.geoplugin_longitude}`,
      'dollar': `${json.geoplugin_currencyConverter} ${json.geoplugin_currencyCode}`
    }
    setIp(data)
  }
  useEffect(() => {
    fetchUrl()
  }, [])
  return ip
}
// TODO
// edit markdown text in vim style (steps to blog implementation)
//export const vim = () => ()
// Resize terminal window
//export const resize = () => ()
// Change background color
//export const background = () => ()
// Change text color
//export const color = () => ()
// Prompt when non-existing command was inserted
//export const empty = () => ()
// subscribe people to the email
/* export const subscribeme = (email) => {} */
