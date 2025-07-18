import { useState } from 'react'
import { 
  // BrowserRouter, 
  HashRouter as Router,
  Routes, 
  Route,
  Link
} from 'react-router-dom'
import './App.css'

import Home from './pages/Home'
import About from './pages/About'

function App() {
 

  return (
    <>
    <Router>
     <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>    
          <Link to="/about">About</Link>
        </li>
        
      </ul>
     </nav>
     <main>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
     </main>
    </Router>
    </>
  )
}

export default App
