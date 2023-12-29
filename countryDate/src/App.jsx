import React, { useState, useEffect } from 'react'
import axios from 'axios'
const miClaveAPI = import.meta.env.VITE_MY_KEY
function App() {
  const [country, setCountry] = useState([])
  const [finder, setFinder] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [newCountry, setNewCountry] = useState([])
  const [language, setLanguage] = useState([])
  const [city, setCity] = useState('Buenos Aires')
  const [extra, setExtra] = useState([])
  const hook = () => {
    console.log('Effect')
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response)=>{
        // console.log(response.data[0].name.common)
        setCountry(country.concat(response.data))
        console.log('Promesa cumplida')
      })
    console.log(miClaveAPI)
  }

  const weather = () => {
    axios.get(`http://api.weatherapi.com/v1/current.json?key=${miClaveAPI}=${city}&aqi=no`)
    .then(response => {
      console.log('temperatura: ',response.data.current.temp_c);
      console.log('viento: ',response.data.current.wind_kph)
      console.log('condicion: ',response.data.current.condition.text)
      console.log('icono: ', response.data.current.condition.icon)
      const countryWeather = {
        temp:response.data.current.temp_c,
        viento:response.data.current.wind_kph,
        condicion:response.data.current.condition.text,
        icono:response.data.current.condition.icon
      }
      setExtra(countryWeather)
      console.log(countryWeather)
    }).catch(error => {
      console.log(error);
    });
  }
  useEffect(weather,[city])
  useEffect(hook,[])
  const handleChange = (event) => {
    const xd = event.target.value
    setFinder(event.target.value)
    
  }
  useEffect(()=>{
    if(country.filter(c=>c.name.common.toLowerCase().includes(finder.toLowerCase())).length>0){
      const xd = country.filter(c=>c.name.common.toLowerCase().includes(finder.toLowerCase()))
      console.log('XD:',xd)
      const unique = Array.from(new Set(xd.map(c => c.name.common)))
        .map(name => {
          return xd.find(c => c.name.common === name)
        });
      console.log('Unico: ',unique)
      if(unique.length>10){
        setShowAll(true)
        const countryObject = {
          name:{common:'hay muchos paises'}
        }
        setNewCountry([countryObject])
      }else if(unique.length===1){
        setShowAll(false)
        setNewCountry(unique)
        
      }else{
        setShowAll(true)
        setNewCountry(unique)
      }
    }
  },[finder])
  useEffect(()=>{
    if(!showAll){
      let f = newCountry.map(c=>c.languages)[0]
      var lan = []
      for(let i in f){
        console.log(i)
        console.log(f[i])
        lan.push(f[i])
        console.log(newCountry[0].capital[0])
        setCity(newCountry[0].capital[0])

      }
       setLanguage((lan))
    }
  },[showAll])
  const action = (c) => {
    if(newCountry.length>1){
      console.log(newCountry.length)
      setShowAll(false)
      setNewCountry([c])
    }else{
      alert('demasiados paises')
    }
  }
  const countryToShow = showAll
    ?newCountry.map(c=>(
      <div key={Math.random()*10000}><li >{c.name.common}</li><button onClick={()=>{action(c)}}>Show</button></div>
    ))
    :newCountry.map(c=>(
      <li key={Math.random()*10000}>
      <h2>{c.name.common}</h2>
      <p>Capital:{c.capital}</p>
      <p>Population:{c.population}</p>
      <p>Lenguajes:</p>
      <ul>
      {language.map(l=>(
        <li key={Math.random()}>{l}</li>
      ))}
      </ul>
      <img src={c.flags.png}/>
      <h2>Clima</h2>
      <p>Temperatura:{extra.temp} °C</p>
      <p>Viento: {extra.viento} kmH</p>
      <p>Condición: {extra.condicion}</p>
      <img src={extra.icono}/>
      </li>
    ))
  return (
    <>
      <form>
        <input onChange={handleChange}/>
      </form>
      <ul>
        {countryToShow}
      </ul>
    </>
  )
}

export default App
