const express = require('express')
const mongoose = require('mongoose')
const { MONGODB } = require('./utils/config')
const logger = require('./utils/logger')
const postsRouter = require('./controllers/notes')
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
app.use(middlewares.requestLogger)
app.use('/api/blogs',postsRouter)
app.use(middlewares.unknownEndpoint)
app.use(middlewares.errorHandler)



module.exports = app