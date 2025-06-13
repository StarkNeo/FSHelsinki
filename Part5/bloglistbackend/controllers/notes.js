const postsRouter = require('express').Router()
const Blog = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor, tokenExtractor } = require('../utils/middleware')

/*
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}*/

postsRouter.get('/', async (request, response, next) => {
  try {
    const posts = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    return response.status(200).json(posts)
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



postsRouter.post('/',tokenExtractor,userExtractor,async (request, response, next) => {
  const body = request.body
  console.log(body)
  const userId = request.user
  try {
    //const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    //const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!userId) {
      return response.status(401).json({ error: 'token invalid' })
    }
    //const user = await User.findById(decodedToken.id)
    const user = await User.findById(userId)
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
  } catch (error) {
    next(error)
  }




})

postsRouter.delete('/:id',tokenExtractor,userExtractor,async (request, response, next) => {
  const id = request.params.id
  const userId = request.user
  try {
    //const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!userId) {
      return response.status(401).json({ error: 'token invalid' })
    }
    //const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(id)


    if (!blog) {
      return response.status(400).json({ error: 'post id does not exist' })
    }

    if (blog.user.toString() === userId.toString()) {
      try {
        await Blog.findByIdAndDelete(id)
        const user = await User.findById(userId)
        user.posts = user.posts.filter(p => p.toString() !== blog._id.toString())
        await user.save()
        return response.status(204).end()
        
      } catch (error) {
        next(error)
      }
    }
    return response.status(400).json({ error: 'Post id does not match user id' })
  } catch (error) {
    next(error)
  }




})

postsRouter.put('/:id',tokenExtractor, async (request, response, next) => {
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