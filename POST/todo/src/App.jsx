import React from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import FormLogin from './components/FormLogin'
import Signup from './components/Signup'
import Pagina1 from './components/Pagina1'

function App() {

  return (
    <div className="app">
      <section>
        <FormLogin/>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/post" element={<Pagina1 />} />
        </Routes>
      </section>
    </div>
  )
}

export default App