import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Addpost from './components/Addpost'
import { Login } from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  //Add post fields
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll()
      .then(response => setBlogs(response))

  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      console.log("esto returna el server", user)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage("Wrong credentials")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const handleChangeUsername = (event) => {
    setUsername(event.target.value)
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleChangeTitle=(event)=>{
    setTitle(event.target.value)
  }

  const handleChangeAuthor=(event)=>{
    setAuthor(event.target.value)
  }

  const handleChangeUrl=(event)=>{
    setUrl(event.target.value)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleCreatePost = (event) => {
    event.preventDefault()
    console.log(event)
    const newPost = {
      title: title,
      author:author,
      url: url
    }
    blogService.createNote(newPost)
      .then(response => {
        let newBlogs = blogs.concat(response)
        console.log(response)

        setBlogs(newBlogs)
      }
      )
    setTitle('')
  }


  return (
    <div>
      {errorMessage}
      {user === null ? <Login
        handleLogin={handleLogin}
        username={username}
        password={password}
        handleChangeUsername={handleChangeUsername}
        handleChangePassword={handleChangePassword} />
        :
        <div>
          <p>{user.name} Logged In</p>
          <input type="button" value="logout" onClick={handleLogout} />
          <div>
            <h2>create new</h2>
            <Addpost 
            handleSubmit={handleCreatePost}
            handleChangeTitle={handleChangeTitle}
            handleChangeAuthor={handleChangeAuthor}
            handleChangeUrl={handleChangeUrl}
            title={title}
            author={author}
            url ={url} />
          </div>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}

        </div>


      }


    </div>
  )
}

export default App