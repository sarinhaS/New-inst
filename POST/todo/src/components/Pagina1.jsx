import { useState } from 'react';
import Post from './Post';
import PostForm from "./PostForm"

function App() {
  
  const [posts, setPosts] = useState([
    {
      id: 1,
      text: "Criar funcionalidade x no sistema",
      file: '../src/img/post.png',
      isCompleted: false,
    },
    {
      id: 2,
      text: "ir para a academia",
      file: '../src/img/post.png',
      isCompleted: false,
    },
    {
      id: 3,
      text: "Estudar React",
      file: '../src/img/post.png',
      isCompleted: false,
    },
    {
      id: 4,
      text: "Estudar JavaScript",
      file: '../src/img/post.png',
      isCompleted: false,
    }
  ]);


  const addPost = (text, file) => {
      const newPost = [...posts, {
        id: Math.floor(Math.random() * 10000),
        text,
        file,
        isCompleted: false,
      },];
      setPosts(newPost);
  }

  const removePost = (id) => {
    const newPost = [...posts,]
    const filteredPosts = newPost.filter(post => post.id !== id ? post : null);
    setPosts(filteredPosts)
  }

  const completePost = (id) => {
    const newPost = [...posts,]
    newPost.map((post) => post.id === id ? (post.isCompleted = !post.isCompleted) : post);
    setPosts(newPost)
  }

  return (
    <div className="app">
    
      <PostForm addPost={addPost}/>
      <div className="todo-list">
      <h1 className='list'>Lista de posts</h1>
      {posts
        .map((post) => (
          <Post key={post.id} post={post} removePost={removePost} completePost={completePost}/>
        ))
      }
      </div>
    </div>
  )
}


export default App