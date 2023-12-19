import Course from "./components/Course"
import React, {useState} from 'react'
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ]


  return(
    <div>
      <h1>Web Development curriculum</h1>
        {courses.map((c)=>(
          <div key={c.id}>
            <Course course={c}/>
            <h4>
              total of {c.parts.reduce((sum,e)=>{
              return sum + e.exercises
              },0)} exercises
            </h4>
          </div>
          ))}
          
    </div>
  )
}

export default App