const express = require('express');
const cors = require('cors');
const app=express();
const dotenv = require('dotenv');
dotenv.config();
const Note = require('./models/note')
const { default: mongoose } = require('mongoose');

app.use(express.json())
app.use(cors());
app.use(express.static('build'))
/*
let USER = process.env.USER;
let PASS = process.env.PASS;

let url = `mongodb+srv://${USER}:${PASS}@cluster0.niabjhj.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false);
mongoose.connect(url);


const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean
})

const Note = mongoose.model('Note',noteSchema);
/*We also don't want to return the mongo versioning field __v to the frontend.

One way to format the objects returned by Mongoose is to modify the toJSON method of the schema, which is used on all instances of the models produced with that schema.
*/
/*noteSchema.set('toJSON',{
    transform:(document, returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
*/

let notes = [
    {
      id: "1",
      content: "HTML is easy",
      important: true
    },
    {
      id: "2",
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
        id: "3",
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
];

const generateId=()=>{
    let maxId = notes.length>0?Math.max(...notes.map(n=>Number(n.id))):0;
    return String(maxId+1)
}


app.get('/',(request, response)=>{
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes',(request, response)=>{
    Note.find({}).then(notes=>{
        response.json(notes)
    }) 
})

/*The unique address we will use for an individual note is of the form notes/10, where the number at the end refers to the note's unique id number.
We can define parameters for routes in Express by using the colon syntax:*/

app.get('/api/notes/:id',(request, response)=>{
    /*const id =  request.params.id;
    const note = notes.find(note=>note.id===id)
    // If no note is found, the server should respond with the status code 404 not found instead of 200.//
    if(note) response.json(note)
        else response.status(404).end()*/
    Note.findById(request.params.id).then(note=>{
        response.json(note)
    })
})

app.delete('/api/notes/:id',(request,response)=>{
    const id = request.params.id;
    notes = notes.filter(note=>note.id !== id);
    response.status(204).end(); 
})

app.post('/api/notes',(request, response)=>{
    let body = request.body;
    if(!body.content){
        return response.status(400).json({error:'content missing'})
    }

    let note = new Note({
        content:body.content,
        important:body.important||false,
        //id:generateId(),
    });
    //notes = notes.concat(note)
    note.save().then(savedNote=>{
        response.json(savedNote)
    })
    //response.json(note)
})

app.put('/api/notes/:id',(request, response)=>{
    let id = request.params.id;
    let note = new Note(request.body)
    note.save().then(updatedNote=>{
        response.json(updatedNote)
    })
    /*
    let oldNote = notes.find(note=>note.id===id);
    if(oldNote){
        let updatedNote = request.body
        console.log(oldNote)
        console.log(updatedNote);
        console.log(notes)
        notes = notes.filter(note=>note.id !== id)
        notes = notes.concat(updatedNote)
        console.log(notes)        
        return response.send(updatedNote)
    }
    response.status(404).end()*/
    
})


const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
