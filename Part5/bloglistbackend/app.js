const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { MONGODB } = require('./utils/config')
const logger = require('./utils/logger')
const postsRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middlewares = require('./utils/middleware')
const app = express()

logger.info('connecting to MONGODB',MONGODB)

mongoose
    .connect(MONGODB)
    .then(() => {
        logger.info('Connection to MongoDB successfully')
    })
    .catch(error => {
        logger.error('error connection to MongoDB:',error.message)
    })

//Middlewares decs
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
app.use(middlewares.requestLogger)
//app.use(middlewares.tokenExtractor)
//app.use(middlewares.userExtractor)
app.use('/api/blogs',postsRouter)
app.use('/api/users',usersRouter)
app.use('/api/login',loginRouter)
app.use(middlewares.unknownEndpoint)
app.use(middlewares.errorHandler)



module.exports = app