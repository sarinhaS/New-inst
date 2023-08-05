import React from 'react'

const Post = ({ post, removePost, completePost }) => {
  return (
    <div className="todo" style={{textDecoration: post.isCompleted ? "line-through" : ""}}>
      <div className="content">
        <p className='text-post'>{post.text}</p>
        <img src={post.file} className="category"/>
      </div>
      <div className='buttons-post'>
        <button className="complete" onClick={() => completePost(post.id)}>Completar</button>
        <button className="remove" onClick={() => removePost(post.id)}> X </button>
      </div>
    </div>
  )
}

export default Post