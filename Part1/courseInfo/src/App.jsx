const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part=(props)=>{
  return(
    <p>{props.part} {props.exercise}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.exercises[0].part} exercise={props.exercises[0].exercise} />
      <Part part={props.exercises[1].part} exercise={props.exercises[1].exercise} />
      <Part part={props.exercises[2].part} exercise={props.exercises[2].exercise} />      
    </div>

  )
}

const Total=(props)=>{
  return (
<p>Number of exercises {props.total}</p>
  )
}
const App = () => {
  const course = "Half Stack application development";
  const exercises =[
    {part:"Fundamentals of React", exercise:10},
    {part:"Using props to pass data", exercise:7},
    {part:"State of a component", exercise:14}
  ]
  
  return (
    <div>
      <Header course={course} />
      <Content exercises={exercises} />
      <Total total={exercises[0].exercise+exercises[1].exercise+exercises[2].exercise} />
    </div>
  )
}

export default App
