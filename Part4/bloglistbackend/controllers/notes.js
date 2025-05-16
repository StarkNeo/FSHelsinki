const postsRouter = require('express').Router()
const Blog = require('../models/note')

postsRouter.get('/', (request, response) => {
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
      response.json(savedPost)
    })
    .catch(error => next(error))
})

module.exports = postsRouter