import Header from "./Header"
import Total from "./Total"
import Content from "./Content"

const Course = ({ course }) => {
  console.log(course)
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>

  )
}

export default Course
