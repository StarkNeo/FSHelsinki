const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path: ', request.path)
  logger.info('Body: ', request.body)
  logger.info('---')
  next()
}



const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  if(request.method === 'GET') next()
  const authorization = request.get('authorization')
  console.log(request.method)
  
  try {
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
    next() 
  }  
  } catch (error) {
    //response.status(400).json({ error: 'Invalid or missing token' })
    next(error)
  }
  
}

const userExtractor = (request, response, next)=>{
  if(request.method === 'GET') next()
  const authorization = request.get('authorization')
  try {
    if(authorization && authorization.startsWith('Bearer ')){
      const token = authorization.replace('Bearer ','')
      const tokenDecoded = jwt.verify(token,process.env.SECRET)
      const user = tokenDecoded.id
      request.user = user
      next()
    }
  } catch (error) {
    next(error)
  }
}


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}