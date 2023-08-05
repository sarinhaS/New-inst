import React from 'react'
import { useState } from 'react';

const PostForm = ({ addPost }) => {
  const [value, setValue] = useState("");
  const [img, setImg] = useState("");

  const handleSubmit = (e)  => {
    e.preventDefault();
    if(!value || !img) return;
    console.log(value, img)
    // adicionar post
    addPost(value, img);
    // limpar os campos
    setValue("");
    setImg("");
  };

  return (
    <div className="todo-form">
        <h2 className='criar'>Criar um post:</h2>    
        <form onSubmit={handleSubmit} className='form-post'>
            <input className='input-post' type="text" placeholder="Digite o título" value={value} onChange={(e) => setValue(e.target.value)} />
            <input className='input-select' type="file" value={img} onChange={(e) => setImg(e.target.value)} />
            <button className='button-post' type="submit">Criar post</button>
        </form>
    </div>
  )
}

export default PostForm