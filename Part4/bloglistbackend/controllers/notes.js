const postsRouter = require('express').Router()
const Blog = require('../models/note')

postsRouter.get('/',(request, response) => {
  Blog.find({})
    .then(posts => {
      response.json(posts)
    })
})

postsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(post => {
      if (post) {
        response.json(post)
      }
      else {
        response.status(404).end()
      }
    })
    .catch(error => logger.error(error))
})

postsRouter.post('/', (request, response, next) => {
  const body = request.body

  const post = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })
  post.save()
    .then(savedPost => {
      response.status(201).json(savedPost)
    })
    .catch(error => next(error))
})

postsRouter.delete('/:id',async (request, response)=>{
  const id = request.params.id
  
  try {
      await Blog.findByIdAndDelete(id)
      response.status(204).end()
    } catch (error) {
      next(error)
    }

})

module.exports = postsRouter