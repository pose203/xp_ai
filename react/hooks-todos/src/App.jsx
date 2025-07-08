import { useState } from 'react'

import './App.css'
import Todos from './components/Todos'

function App() {
  

  return (
    <>
   {/*开发的认为你无单位就是组件  */}
   {/* <div style = {{fontSize: '12px',width: '5rem',height: '5rem', background: 'red',margin: '0 auto',borderRadius: '50%'}}>
   <div style = {{fontSize: '14px',width: '3.5714em',height: '3.5714em', background: 'red',margin: '0 auto',borderRadius: '50%'}}> */}
    {/* </div>
   </div> */}
   <Todos />
    </>
  )
}

export default App
