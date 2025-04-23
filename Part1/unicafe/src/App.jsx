import { useState } from "react";

const Button = (props) => {
  return (
    <button onClick={props.onClick} >{props.text}</button>
  )

}
const StatisticLine=(props)=>{
  return(
    <p>{props.text} {props.value}</p>
  )
}

const Statistics = (props) => {
  const {good,neutral,bad} = props.sentiment;
  const calculateAverage = () => {
    return props.total === 0 ? 0 : props.score / props.total;
  }

  const calculatePositives = () => {
    return props.total === 0 ? 0 : good / props.total;
  }

  if (props.total === 0) {
    return(
      <h3>No feedback given</h3>
    )
  } else {
    return (
      <div>
        <h2>statistics</h2>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="total" value={props.total} />
        <StatisticLine text="average" value={calculateAverage()} />
        <StatisticLine text="positive" value={`${calculatePositives()*100} %`} /> 
       
      </div>
    )  
  }
  

}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allfeed, setAllfeed] = useState(0);
  const [score, setScore] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
    setAllfeed(allfeed + 1);
    setScore(score + 1);
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setAllfeed(allfeed + 1);

  }

  const handleBadClick = () => {
    setBad(bad + 1);
    setAllfeed(allfeed + 1);
    setScore(score - 1);
  }

  

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <Statistics sentiment={{good,neutral,bad}} total={allfeed} score ={score} />
    </div>

  )

}

export default App;

