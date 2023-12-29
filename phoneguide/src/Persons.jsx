import Name from "./components/Name"
const Persons = ({ personsToShow,deletePerson }) => {
    return(
      <ul>
        {personsToShow.map(person=>(
          <Name key={person.id} person={person} deletePerson={deletePerson}/>))}
      </ul>
    )
}
export default Persons