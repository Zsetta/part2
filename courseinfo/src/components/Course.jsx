import Header from "./Header"
import Content from "./Content"
const Course = ( {course} ) => {
    return(
        <div>
            <Header header={course.name}/>
            {course.parts.map(c=>(
                <Content key={c.id} course={c}/>
            ))}
        </div>
    )
}
export default Course