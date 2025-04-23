import { useState } from "react"

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const DailyAnecdote = (props) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdote}</p>
      <p>has {props.votes} Votes </p>
    </div>

  )
}

const MostVoted = (props) => {
  const [most, setMost] = useState({})
  console.log(most.votes);
  const mostVoted = () => {
    let most = props.story.reduce((prev, next) => next.votes > prev.votes ? next : prev);
    console.log(most);
    setMost(most);
  }
  return (
    <>
      <div>
        <h1>Anecdote with most votes</h1>
        
        {most.votes === undefined || most.votes === 0? "":<div><p>{most.anecdote}</p><p>has {most.votes} votes</p></div>}
        
      </div>
      <Button onClick={() => mostVoted()} text="Most voted" />
    </>

  )

}
const App = () => {

  const anecdotes =
    [
      {
        anecdote: 'If it hurts, do it more often.',
        votes: 0
      },
      {
        anecdote: 'Adding manpower to a late software project makes it later!',
        votes: 0
      },
      {
        anecdote: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        votes: 0
      },
      {
        anecdote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        votes: 0
      },
      {
        anecdote: 'Premature optimization is the root of all evil.',
        votes: 0
      },
      {
        anecdote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        votes: 0
      },
      {
        anecdote: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        votes: 0
      },
      {
        anecdote: 'The only way to go fast, is to go well.',
        votes: 0
      }
    ]
  
  const [selected, setSelected] = useState(Math.floor(Math.random()*(anecdotes.length)));
  const [story, setStory] = useState(anecdotes);
  const [most, setMost] = useState({});

  const addVotes = (index) => {
    let newVotes = (story[index].votes) + 1;
    console.log(newVotes);
    let newStories = [...story];
    newStories[index].votes = newVotes;
    setStory(newStories);
    console.log("After", story);
  }
  const handleClick = () => {
    let randomNumber = Math.floor(Math.random() * (anecdotes.length));
    console.log(randomNumber);
    setSelected(randomNumber);

  }



  return (
    <>
      <DailyAnecdote anecdote={story[selected].anecdote} votes={story[selected].votes} />
      <Button onClick={() => addVotes(selected)} text="Vote" />
      <Button onClick={handleClick} text="next anecdote" />
      <MostVoted story={story} />
    </>

  )
}


export default App
