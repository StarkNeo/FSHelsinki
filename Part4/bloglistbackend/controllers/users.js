const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { info, error } = require('../utils/logger')


usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).select('username name id ')
    response.status(200).json(users)

  } catch (error) {
    next(error)
  }

})

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body
  try {
    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User(
      {
        username,
        name,
        passwordHash
      }
    )
    const savedUser = await user.save()
    response.status(201).json(savedUser)

  } catch (error) {
    next(error)
  }

})

module.exports = usersRouter