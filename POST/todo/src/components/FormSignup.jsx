import React from 'react'
import { useState } from 'react'

const FormSignup = () => {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName ] = useState("")
    const [confirmpassword, setConfirmpassword] = useState("")
  return (
    <div className='form-signup'>
        
        <span className='span-signup'>FAÇA SEU CADASTRO:</span> <br/>
            <input className='input-signup' type="text" placeholder="Digite aqui seu nome" value={name} onChange={(e) => setName(e.target.value)}/><br/>
            <input className='input-signup' type="email" placeholder="Digite aqui seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
            <input className='input-signup' type="password" placeholder="Digite aqui sua senha" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
            <input className='input-signup' type="password" placeholder="Confirme sua senha" value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)}/><br/>
            <button className='button-signup'type='submit'>Fazer cadastro!</button>
    </div>
  )
}

export default FormSignup