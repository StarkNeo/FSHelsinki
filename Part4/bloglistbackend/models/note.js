const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: {type: String, required:true},
    author: String,
    url: {type: String, required:true},
    likes: {
        type: Number,
        required: true,
        default: 0
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

//const Blog = mongoose.model('Blog', blogSchema)

//module.exports = Blog
module.exports = mongoose.model('Blog',blogSchema)