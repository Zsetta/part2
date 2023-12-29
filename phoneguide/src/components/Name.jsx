const Name = ( {person,deletePerson} ) => {
    return(
        <div>
            <li>Name:{person.name} Number: {person.number} </li>
            <button onClick={()=>{deletePerson(person)}}>delete</button>
        </div>
    )
}
export default Name