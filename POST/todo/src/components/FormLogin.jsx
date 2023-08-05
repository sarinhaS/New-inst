import React from 'react'
import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import axios from 'axios'

const FormLogin = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function clientSubmit(e){
        console.log(email, password)
        e.preventDefault()
        // setEmail("")
        // setPassword("")
        if(!email || !password) return;
        axios.post('http://localhost:3000/login', {
            email : email,
            password : password
        }).then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  return (
    <div >
        <form className='form' onSubmit={clientSubmit}>
            <span className='span'>FAÇA SEU LOGIN:</span> <br/>
            <input className='input' type="email" placeholder="Digite aqui seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
            <input className='input' type="password" placeholder="Digite aqui sua senha" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
            <button className='button' type='submit'>Fazer login!</button>
            <h4 className='h4'>Ainda não tem conta?</h4>
            <h5 className='h5'>Faça seu cadastro <Link to="/signup">aqui!</Link> </h5>
            
        </form>
    </div>
  )
}

export default FormLogin