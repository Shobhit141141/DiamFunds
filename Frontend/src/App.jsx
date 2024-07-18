import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Details from './pages/Details';
import Home from './pages/Home';
import './index.css'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='login' element={<Login/> } />
        <Route path='details' element={<Details/> } />
        <Route path='home' element={<Home/> } />
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
