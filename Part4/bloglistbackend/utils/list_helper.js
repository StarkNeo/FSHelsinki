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

const mostBlogs =(blogs)=>{
  let authors = blogs.map(blog=>blog.author)
  let most = authors.reduce((acc,next)=>{
    console.log(acc[next])
    
    acc[next] === undefined?acc[next]= 1: acc[next]+=1
    console.log(acc)
    return acc 
  },{})
  let top = {author:"",blogs:0}
  for (const key in most) {
    most[key] > top.blogs? (top.author=key, top.blogs=most[key]): ""
  }
  return top
  
}

module.exports = {
  dummy,
  sumLikes,
  favoriteBlog,
  mostBlogs
}

