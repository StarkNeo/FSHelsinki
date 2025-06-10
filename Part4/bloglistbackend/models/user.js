const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    passwordHash:{
        type: String,
        required: true
    },
    posts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Blog'
        }
    ]
})

userSchema.set('toJSON',{
    transform:(document, returnedObj)=>{
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model('User',userSchema)