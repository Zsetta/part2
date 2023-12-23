import React, { useState } from 'react'
import Persons from './Persons'
import PersonForm from './components/PersonForm'
import FinderForm from './components/finderForm'
const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [finder, setFinder] = useState('')
  const [showAll, setShowAll] = useState(true) 
  const addName = (event) => {
    event.preventDefault()
    const personObject = { name:newName, number: newNumber ,id:persons.length+1 } 
    let toAdd = exist(personObject.name)
    console.log(toAdd)
    toAdd ? alert('Already exists',toAdd.name): setPersons(persons.concat(personObject)) 
    setNewName('')
    setNewNumber('')
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const exist = (personToFind) => {
    const result = persons.find(person=>person.name === `${personToFind}`) 
     return result
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const changeFinder = (event) => {
    const xd = event.target.value 
    setFinder(xd)
    console.log(finder)
    xd.length >0 ? setShowAll(false):setShowAll(true)
  }
  const personsToShow = showAll
    ? persons
    : persons.filter(person=>person.name.toLowerCase().includes(finder.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>
      <FinderForm changeFinder={changeFinder}/>
      <h2>Add new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App