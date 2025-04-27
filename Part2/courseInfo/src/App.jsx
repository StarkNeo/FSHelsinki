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

const Total = ({parts}) => {
  console.log(parts);
  let total = parts.reduce((s,p)=>s+p.exercises,0)
  console.log(total)
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
        name:"Redux",
        exercises: 11
      }
    ],
    
  }
  
  return (
    <Course course={course} />
  )
}

export default App
