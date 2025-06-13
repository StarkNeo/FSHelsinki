const { post } = require('../app')
const Blog = require('../models/note')
const User = require('../models/user')
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

const initialUsers=[
    {
        username:"admin",
        name:"Stark",
        password:"avenger"
    }
]

const getAllUsers = async()=>{
    const users = await User.find({})
    console.log(users)
    return users
}

module.exports = { initialNotes, validateNoteProperty, getAllElements,initialUsers,getAllUsers }