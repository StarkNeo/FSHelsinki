import { useState } from "react"

const App=()=>{
  
    const anecdotes = 
    [
      {
        anecdote:'If it hurts, do it more often.',
        votes:0
      },
      {
        anecdote: 'Adding manpower to a late software project makes it later!',
        votes: 0
      },
      {
        anecdote: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        votes:0
      },
      {
        anecdote:'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        votes:0
      },
      {
        anecdote:'Premature optimization is the root of all evil.',
        votes: 0
      },
      {
        anecdote:'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        votes: 0
      },
      {
        anecdote:'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        votes: 0
      },
      {
        anecdote:'The only way to go fast, is to go well.',
        votes: 0
      }
    ]

  const [selected, setSelected] = useState(0);
  const [story, setStory] = useState(anecdotes)
  
  const addVotes=(index)=>{
    let newVotes = (story[index].votes)+1;
    console.log(newVotes);
    let newStories = [...story];
    newStories[index].votes=newVotes;
    setStory(newStories);
    console.log("After", story);
  }
  const handleClick=()=>{    
    let randomNumber = Math.floor(Math.random()*(anecdotes.length));
    console.log(randomNumber);
    setSelected(randomNumber);
    
  }

  
  return(
    <div>      
      <p>{story[selected].anecdote}</p>
      <p>has {story[selected].votes} Votes </p>
      <button onClick={()=>addVotes(selected)}> Vote</button>
      <button onClick={handleClick}>next anecdote</button>
    </div>
  )
}


export default App
