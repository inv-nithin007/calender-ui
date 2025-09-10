import { useState } from 'react'
import Tail from './components/Tail'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {
  

  return (
    <Router>
      <Routes>
    <Route path='/' element={<Tail/>}/>
     <Route path='/home' element={<Home/>}/>
    </Routes>
    </Router>
  )
}

export default App
