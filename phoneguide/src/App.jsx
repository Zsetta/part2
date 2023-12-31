import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './Persons'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import FinderForm from './components/finderForm'
import services from './services/services'
import ErrNotification from './components/ErrNotification'
const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [finder, setFinder] = useState('')
  const [showAll, setShowAll] = useState(true) 
  const [message, setMessage] = useState(null)
  const [errMsg, setErrMsg] = useState(null)
  const hook = () => {
    services
      .get()
      .then(dataBase=>setPersons(dataBase))
  }
  useEffect(hook,[])
  const addName = (event) => {
    event.preventDefault()
    const personObject = { name:newName, number: newNumber  } 
    let toAdd = exist(personObject.name)
    toAdd 
      ? window.confirm('Already exists, update?')
        ?update(personObject)
        :null
      : handleAddName(personObject) 
    setNewName('')
    setNewNumber('')
  }
  const update = (personObject) => {
    const personToUpdate = persons.find(person=>person.name.toLowerCase() === personObject.name.toLowerCase())
    const url = `http://localhost:3001/persons/${personToUpdate.id}`
    const changedPerson = { ...personToUpdate, number:personObject.number}
    console.log(changedPerson)
    axios 
      .put(url,changedPerson)
      .then(response=>{
        setPersons(persons.map(person=>person.id === changedPerson.id ? response.data: person))
        setMessage('Number changed')
        setTimeout(()=>{
          setMessage(null)
        },3000)
      })
  }
  const handleAddName = (personObject) => {
    services
      .post(personObject)
      .then(add=>{
        setPersons(persons.concat(add))
        console.log('person added')
        setMessage(`Added ${personObject.name}`)
        setTimeout(()=>{
          setMessage(null)
        },3000)
      })
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const exist = (personToFind) => {
    const result = persons.find(person=>person.name.toLowerCase() === `${personToFind.toLowerCase()}`) 
     return result
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const changeFinder = (event) => {
    const xd = event.target.value 
    setFinder(xd)
    console.log(finder)
    xd.length > 0 ? setShowAll(false):setShowAll(true)
  }
  const deletePerson = (parametro) => {
    const confirm=window.confirm('Estas seguro?')
    confirm 
      ? services 
      .remove(parametro)
      .then(response=>setPersons(persons.filter(person=>person.id !== parametro.id ? person : null)))
      .catch(err=>{
        setErrMsg('User already deleted')
        setTimeout(()=>{
          setErrMsg(null)
        },3000)
      })
      :null
  }
  const personsToShow = showAll
    ? persons
    : persons.filter(person=>person.name.toLowerCase().includes(finder.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <ErrNotification errMsg={errMsg}/>
      <FinderForm changeFinder={changeFinder}/>
      <h2>Add new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App