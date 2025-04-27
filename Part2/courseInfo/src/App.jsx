const Header = ({name}) => {
  console.log(name);
  return (
    <h1>{name}</h1>
  )
}

const Part = (props) => {
  console.log(props);
  return (
    <li>{props.part} {props.exercise}</li>
  )
}

const Content = (props) => {
  console.log(props);
  let parts = props.parts;
  console.log(parts);
  return (
    <ul>
      {parts.map(part=><Part key={part.id} part={part.name} exercise={part.exercises} />)}
    </ul>


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

const Course=({course})=>{
  console.log(course)
  return(
    <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts ={course.parts}/>
    </div>
    
  )
}

const App = () => {
  const course = {
    id: 1,
    name:"Half Stack application development",
    parts: [
      {
        id:1,
        name: "Fundamentals of React",
        exercises: 10,
        
      },
      {
        id:2,
        name: "Using props to pass data",
        exercises: 7
      },
      {
        id:3,
        name: "State of a component",
        exercises: 14
      },
      {
        id:4,
        name:"Hooks",
        exercises: 10
      }
    ],
    
  }
  
  return (
    <Course course={course} />
  )
}

export default App
