import { useState, useEffect } from "react"
import blogService from "../services/blogs"

const Addpost = () => {
  const [addNoteVisible, setAddNoteVisible] = useState(false)
  //Add post fields
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleChangeTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleChangeAuthor = (event) => {
    setAuthor(event.target.value)
  }

  const handleChangeUrl = (event) => {
    setUrl(event.target.value)
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



  return (
    <>
      <div style={{ display: addNoteVisible ? 'none' : '' }}>
        <button onClick={() => setAddNoteVisible(true)}>new note</button>
      </div>
      <div style={{ display: addNoteVisible ? '' : 'none' }}>
        <form onSubmit={handleCreatePost}>
          <div>
            title:
            <input type="text" name="title" value={title} onChange={handleChangeTitle} />
          </div>
          <div>
            author:
            <input type="text" name="author" value={author} onChange={handleChangeAuthor} />
          </div>
          <div>
            url:
            <input type="text" name="url" value={url} onChange={handleChangeUrl} />
          </div>
          <button type="submit">create</button>
        </form>
        <button onClick={() => setAddNoteVisible(false)}>cancel</button>
      </div>

    </>

  )
}


export default Addpost