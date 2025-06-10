const postsRouter = require('express').Router()
const Blog = require('../models/note')
const User = require('../models/user')

postsRouter.get('/', async (request, response, next) => {
  try {
    const posts = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.status(200).json(posts)
  } catch (error) {
    next(error)
  }

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

postsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const user = await User.findById(body.userId)
  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }
  const post = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  try {
    const savedNote = await post.save()
    user.posts = user.posts.concat(savedNote._id)
    await user.save()
    response.status(201).json(savedNote)
  } catch (error) {
    next(error)
  }

})

postsRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id

  try {
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }

})

postsRouter.put('/:id', async (request, response, next) => {
  const { likes } = request.body
  console.log("likes in controller: ", likes)
  try {
    const post = await Blog.findById(request.params.id)
    console.log(post)
    if (!post) {
      return response.status(404).end()
    }
    post.likes = likes

    let updatedNote = await post.save()
    response.status(201).json(updatedNote)

  } catch (error) {
    next(error)
  }

})

module.exports = postsRouter