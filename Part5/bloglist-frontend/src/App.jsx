import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Addpost from './components/Addpost'
import { Login } from './components/Login'
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  //Add post fields
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [addNoteVisible, setAddNoteVisible] = useState(false)

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
      setMessage("Wrong username or password")
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

  }

  const handleChangeUsername = (event) => {
    setUsername(event.target.value)
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleChangeTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleChangeAuthor = (event) => {
    setAuthor(event.target.value)
  }

  const handleChangeUrl = (event) => {
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
      author: author,
      url: url
    }
    blogService.createNote(newPost)
      .then(response => {
        let newBlogs = blogs.concat(response)
        console.log(response)

        setBlogs(newBlogs)
        setMessage(`a new blog ${response.title} by ${response.author} added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
      )
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const addNote = () => {
    const hideWhenVisible = { display: addNoteVisible ? 'none' : '' }
    const showWhenVisible = { display: addNoteVisible ? '' : 'none' }
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setAddNoteVisible(true)}>new note</button>
        </div>
        <div style={showWhenVisible}>
          <Addpost
            handleSubmit={handleCreatePost}
            handleChangeTitle={handleChangeTitle}
            handleChangeAuthor={handleChangeAuthor}
            handleChangeUrl={handleChangeUrl}
            title={title}
            author={author}
            url={url} />
            <button onClick={()=>setAddNoteVisible(false)}>cancel</button>
        </div>

      </div>

    )
  }

  return (
    <div>
      <Notification message={message} />
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

            <h2>create new post</h2>
            {addNote()}
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