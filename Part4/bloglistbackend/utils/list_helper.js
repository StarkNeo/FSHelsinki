const dummy = (blogs) => {
  return 1
}

const sumLikes=(blogs)=>{
  return blogs.reduce((sum,item)=>sum+item.likes,0)
}

const favoriteBlog=(blogs)=>{
  let maximum = blogs.reduce((maxBlog, blog)=>{
    return blog.likes > maxBlog.likes ? blog: maxBlog,blogs[0]
  })
  console.log(maximum)
  return maximum

}

module.exports = {
  dummy,
  sumLikes,
  favoriteBlog
}

