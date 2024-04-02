import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/signup/signup';
import Login from './components/login/login';
import {BrowserRouter, Routes, Route} from 'react-router-dom'


function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

    </Routes>
    </BrowserRouter>
  )
}

export default App
