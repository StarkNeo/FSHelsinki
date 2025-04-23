import { useState } from "react";
import './App.css';

const Button = (props) => {
  return (
    <button onClick={props.onClick} >{props.text}</button>
  )

}
const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>

  )
}

const Statistics = (props) => {
  const { good, neutral, bad } = props.sentiment;
  const calculateAverage = () => {
    return props.total === 0 ? 0 : props.score / props.total;
  }

  const calculatePositives = () => {
    return props.total === 0 ? 0 : good / props.total;
  }

  if (props.total === 0) {
    return (
      <h3>No feedback given</h3>
    )
  } else {
    return (
      <table>
        <caption>Statistics</caption>
        <thead>
          <tr>
            <th>Sentiment</th>
            <th>Stat</th>
          </tr>
        </thead>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="total" value={props.total} />
          <StatisticLine text="average" value={calculateAverage().toFixed(2)} />
          <StatisticLine text="positive" value={`${(calculatePositives() * 100).toFixed(2)} %`} />
          </tbody>
        
      </table>
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
    <>
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
    </div>
    <br></br>
    <Statistics sentiment={{ good, neutral, bad }} total={allfeed} score={score} />

    </>
    
  )

}

export default App;

