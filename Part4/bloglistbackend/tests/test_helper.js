const { post } = require('../app')
const Blog = require('../models/note')
console.log(Blog)
const initialNotes = [
    {
        title: "React is great",
        author: "Jesus Hernandez",
        url: "https://reacturl.com",
        likes: 500000000000000
    },
    {
        title: "Postman Sucks",
        author: "Angel Martinez",
        url: "http://postmanurl.com",
        likes: 1000000000
    }
]
//Validate the object response has a specified property
//object = api response, property = property name to be validate
const validateNoteProperty = (object, property) => {
    console.log(object.body)

    return object.body.hasOwnProperty(property)
}

const getAllElements = async () => {
    const posts = await Blog.find({})
    console.log(posts)
    return posts
}



module.exports = { initialNotes, validateNoteProperty, getAllElements }