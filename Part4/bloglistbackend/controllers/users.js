const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { info, error } = require('../utils/logger')


usersRouter.get('/', async (request, response, next) => {
  try {
    //const users = await User.find({}).select('username name id ')
    const users = await User.find({}).select('username name id posts').populate('posts',{title:1, author:1, url:1, id:1})
    response.status(200).json(users)

  } catch (error) {
    next(error)
  }

})

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body
  info("esto recibidio", request.body)

  const passwordHash = await bcrypt.hash(password, 10)
  const user = new User(
    {
      username,
      name,
      passwordHash
    }
  )
  try {
    const savedUser = await user.save()
    info("Esto contesto mongo: ", savedUser)
    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }




})

module.exports = usersRouter