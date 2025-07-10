import { useState } from 'react'
import Page from './components/Page'
import ThemeContext from './ThemeContext.js'
import './App.css'

function App() {
  const [theme,setTheme] = useState('light')

  console.log(ThemeContext,'////')

  return (
    <ThemeContext.Provider value={theme}>
    <Page/>
    <button onClick={()=>setTheme('dark')}>切换主题</button>
    {/* <Uncle/> */}
    {/* <Parent/>
    <Child/>
    <GrandChild/>
    <GreatGrandChild><GreatGrandChil/>
       */}
      
    </ThemeContext.Provider>
  )
}

export default App
