import Name from "./components/Name"
const Persons = ({personsToShow}) => {
    return(
      <ul>
        {personsToShow.map(person=>(
          <Name key={person.id} person={person}/>))}
      </ul>
    )
}
export default Persons