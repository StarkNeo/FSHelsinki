import { useState } from "react"


const Blog = ({ blog }) => {
  const [viewDetails, setViewDetails]=useState(false)

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
  

  return (
  <div style={blogStyle}>
    <div>
      {blog.title} {blog.author}
      <button onClick={handleViewDetails}>{viewDetails?'hide':'view'}</button>
    </div>
    {viewDetails?<div>
      {blog.url}
    <div>
      Likes 0
      <button>Like</button>
      </div>  
    </div>:'' }
    
  </div>

)
    
}

export default Blog