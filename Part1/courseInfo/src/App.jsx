const Header = (props) => {
  console.log(props);
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  console.log(props);
  return (
    <p>{props.part} {props.exercise}</p>
  )
}

const Content = (props) => {
  console.log(props);
  let parts = props.parts;
  
  return (
    
    <div>
      <Part part={parts[0].name} exercise={parts[0].exercises} />
      <Part part={parts[1].name} exercise={parts[1].exercises} />
      <Part part={parts[2].name} exercise={parts[2].exercises} />
    </div>

  )
}

const Total = (props) => {
  console.log(props);
  let total = 0;
  for (let index = 0; index < props.parts.length; index++) {
    total+=props.parts[index].exercises;    
  }
  return (
    <p>Number of exercises {total}</p>
  )
}
const App = () => {
  const course = {
    name:"Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  }
  
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
