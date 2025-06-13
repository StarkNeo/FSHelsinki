import { useState, useEffect } from "react"
import blogService from "../services/blogs"

const Addpost = ({handleSubmit, handleChangeTitle, handleChangeAuthor, handleChangeUrl, title, author,url}) => {
 



  return (
    <form onSubmit={handleSubmit}>
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
  )
}


export default Addpost