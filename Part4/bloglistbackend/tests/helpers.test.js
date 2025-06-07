const assert = require('node:assert')
const { test, describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../tests/test_helper')
const listHelper = require('../utils/list_helper')
const Blog = require('../models/note')

const api = supertest(app)

describe('when there is initially some notes saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialNotes)
  })

  test('post are returned as json', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('Addition of a new note', () => {
  test("Blog post unique identifier should be named id", async () => {
    const newNote = {
      title: "supertest",
      author: "Jesus",
      url: "http://",
      likes: 1000
    }

    // Send the new blog post with the request body
    const response = await api
      .post('/api/blogs')
      .send(newNote)
      .expect(201)  // check for successful creation

    //console.log(response.body)
    //console.log(response.body.hasOwnProperty("id"))
    //assert(response.body.hasOwnProperty("id"))
    assert(helper.validateNoteProperty(response, "id"))
  })

  test("verifies that making an HTTP POST request to the /api/blogs URL successfully creates a new blog post", async () => {
    const newNote = {
      title: "supertest again",
      author: "Jesus Hdz",
      url: "http://",
      likes: 1001
    }
    let elementsBefore = await helper.getAllElements()

    console.log("#Elements before posting: ", elementsBefore.length)

    let postElement = await api
      .post("/api/blogs")
      .send(newNote)
      .expect(201)

    let elementsAfter = await helper.getAllElements()

    console.log("#Elements after posting: ", elementsAfter.length)
    console.log("Elemento posteado: ", postElement.body)
    assert.equal(elementsAfter.length - elementsBefore.length, 1)
  })

})

describe("Viewing a specific note", () => {
  test("verifies that if the likes property is missing from the request, it will default to the value 0", async () => {
    const newNote = {
      title: "supertest again",
      author: "Jesus Hdz",
      url: "http://",
    }
    // Send the new blog post with the request body
    const response = await api
      .post('/api/blogs')
      .send(newNote)
      .expect(201)  // check for successful creation

    console.log(response.body)
    assert.equal(response.body.likes, 0)
  })

  test("verify that if the title or url properties are missing from the request data", async () => {
    let newNote = {
      //title: "supertest again",
      author: "Jesus Hdz",
      url: "http://",
    }
    // Send the new blog post with the request body
    let response = await api
      .post('/api/blogs')
      .send(newNote)
      .expect(400)  // check for fail request 

    console.log(response.body, response.status)
  })

})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of 7', () => {
    let blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      },
    ]
    const result = listHelper.sumLikes(blogs)
    assert.strictEqual(result, 7)
  })

  test('when list has two objects, each has 7 and 5 likes respectively, equals likes return 12', () => {
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
    ]
    const result = listHelper.sumLikes(blogs)
    assert.strictEqual(result, 12)
  })


})

describe('maximum likes, return the object with maximum likes among the others', () => {
  test('maximum likes return object with 7 likes', () => {
    let blogs = [{
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
    },]
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    })
  })

})

describe ("Deletion of a note",()=>{
  test("succeds with status code 204 if id is valid",async()=>{
    const blogsAtStart =  await helper.getAllElements()
    const blogToDelete =  blogsAtStart[0]
    console.log("blog to delete id: ",blogToDelete)

    await api.delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

    const blogsAtEnd =  await helper.getAllElements()
    const titles = blogsAtEnd.map(blog=>blog.title)
    assert(!titles.includes(blogToDelete.title))
    assert.equal(blogsAtEnd.length, blogsAtStart.length-1)

  })
})

describe ("updating the information of an individual blog post",()=>{
  test("updating likes of a blog post",async()=>{
    const blogs = await helper.getAllElements()
    const likesBeforeUpdate = blogs[0].likes
    
    console.log("likes = ",likesBeforeUpdate)
    blogs[0].likes += 1
    console.log("ID = ",blogs[0].id)

    await api.put(`/api/blogs/${blogs[0].id}`)
    .send(blogs[0].toJSON())
    .expect(201)

    const likesAfterUpdate = await helper.getAllElements()

    assert.equal(likesAfterUpdate[0].likes-likesBeforeUpdate,1)
    

  })
})
test('dummy returns one', () => {
  let blogs = []
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})


test('returns the author who has the largest amount of blogs', () => {
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
  let result = listHelper.mostBlogs(blogs)
  assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 })
})

test('return the author who has the most likes in his blog', () => {
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
  let result = listHelper.mostLikes(blogs)
  assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', blogs: 17 })
}) 

after(async () => {
  await mongoose.connection.close()
})