import { useState } from 'react'
import Tail from './components/Tail'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Calender from  './components/Calender'

function App() {
  

  return (
    <Router>
      <Routes>
    <Route path='/' element={<Tail/>}/>
     <Route path='/home' element={<Home/>}/>
     <Route path='/calender' element={<Calender/>}/>
    </Routes>
    </Router>
  )
}

export default App
