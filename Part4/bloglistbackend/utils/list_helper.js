const dummy = (blogs) => {
  return 1
}

const sumLikes = (blogs) => {
  return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favoriteBlog = (blogs) => {
  let maximum = blogs.reduce((maxBlog, blog) => {
    return blog.likes > maxBlog.likes ? blog : maxBlog, blogs[0]
  })
  console.log(maximum)
  return maximum

}

const mostBlogs = (blogs) => {
  let authors = blogs.map(blog => blog.author)
  let most = authors.reduce((acc, next) => {
    console.log(acc[next])
    acc[next] === undefined ? acc[next] = 1 : acc[next] += 1
    console.log(acc)
    return acc
  }, {})
  let top = { author: "", blogs: 0 }
  for (const key in most) {
    most[key] > top.blogs ? (top.author = key, top.blogs = most[key]) : ""
  }
  return top

}

const mostLikes = (blogs) => {
  let most = blogs.reduce((acc, next) => {
    let author = next.author
    if(!acc[author]){
      acc[author] = 0
    }
    acc[author] += next.likes
    return acc
  }, {})
  console.log(most)
  let top = { author: "", blogs: 0 }
  for (const key in most) {
    most[key] > top.blogs ? (top.author = key, top.blogs = most[key]) : ""
  }
  console.log(top)
  return top
  //console.log(Object.entries(most))
  //let mostly = Object.entries(most).reduce((acc, next)=> next[1] > acc[1]? next: acc)
  //console.log(mostly)
  
}
/*
let blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

mostLikes(blogs)
*/


module.exports = {
  dummy,
  sumLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

