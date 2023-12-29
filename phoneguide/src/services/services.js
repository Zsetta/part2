import axios from 'axios'
const get = () => {
    const getPerson = axios.get('http://localhost:3001/persons')
    return getPerson.then(response=>(response.data))
}
const post = (personObject) => {
   const request =  axios.post('http://localhost:3001/persons',personObject)
    return request.then(response=>response.data)
}
const remove = (parametro) => {
    const removing = axios.delete(`http://localhost:3001/persons/${parametro.id}`)
    return removing.then(response=>{response})
}
export default { get,post,remove }