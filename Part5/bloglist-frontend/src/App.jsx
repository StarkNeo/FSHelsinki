import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  
  useEffect(()=>{
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      console.log("esto returna el server",user)
      window.localStorage.setItem('loggedBlogappUser',JSON.stringify(user))
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
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      Login to application
      <div>
        Username:
        <input type="text" name="username" id="username" value={username} onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        Password: <input type='text' name="password" id='password' value={password} onChange={({ target }) => setPassword(target.value)}></input>
      </div>
      <button type='submit'>login</button>
    </form>
  )
  return (
    <div>
      {errorMessage}
      {user === null ? loginForm() :
        <div>
          <p>{user.name} Logged In</p>
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