import { useEffect, useState } from "react"
import blogService from "../services/blogs"


const Blog = ({ blog }) => {
  const [viewDetails, setViewDetails]=useState(false)
  const [likes, setLikes] = useState(0)

  useEffect(()=>{
    setLikes(blog.likes)
  },[])

  const handleViewDetails=()=>{
    setViewDetails(!viewDetails)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  console.log(blog.id)

  const addLikes =async ()=>{
    const response = await blogService.addLikes(blog)
    setLikes(response.likes)
  } 

  return (
  <div style={blogStyle}>
    <div>
      {blog.title} {blog.author}
      <button onClick={handleViewDetails}>{viewDetails?'hide':'view'}</button>
    </div>
    {viewDetails?<div>
      {blog.url}
    <div>
      Likes {likes}
      <button onClick={addLikes}>Like</button>
      </div>  
    </div>:'' }
    
  </div>

)
    
}

export default Blog