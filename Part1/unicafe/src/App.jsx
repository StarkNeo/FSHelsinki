import { useState } from "react";

const Button = (props) => {
  return (
    <button onClick={props.onClick} >{props.text}</button>
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
  return (
    <div>
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {props.total}</p>
      <p>average {calculateAverage()}</p>
      <p>positive {calculatePositives() * 100} %</p>
    </div>
  )

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

