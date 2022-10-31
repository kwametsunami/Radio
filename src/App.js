import './App.css';
import { useEffect, useState } from 'react';
// import AudioPlayer from 'react-h5-audio-player';
// import 'react-h5-audio-player/lib/styles.css';
import Genre from './Genre';
import Stations from './Stations';


function App() {

  const [ allStations, setAllStations] = useState([])
  const [ filteredStations, setFilteredStations] = useState([])

  const getStations = (event, genreSelector) => {
    event.preventDefault();
    const allStationsCopy = [...allStations]
    const stationByTag = allStationsCopy.filter((station) => {
      for (let i = 0; i < allStationsCopy.length; i++){
        return allStationsCopy[i] === genreSelector
      }
      return station.tags === genreSelector
    })
      // for (let i = 0; i < allStationsCopy.length; i++){
      //   stationByTag.push(allStationsCopy.tags === '80s')
      // }
    console.log(stationByTag)
    console.log(genreSelector)
  }

  
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '8e4a9bbd26msh31ec88528a1bb51p195af6jsn4f715f3b0e33',
        'X-RapidAPI-Host': 'radio-browser.p.rapidapi.com'
      }
    };

    fetch('https://radio-browser.p.rapidapi.com/json/stations/search?&bitrateMin=192&reverse=false&offset=0&limit=100&hidebroken=false', options)
      // countrycode=ca&tag=jazz
      .then(response => response.json(), console.log("heyyyyy"))
      .then(info => {
        console.log(info)
        const radioStations = info

        setAllStations(radioStations)
        console.log(radioStations[0].tags)
      })
      .catch((error) => {
        // app.getApi()
        console.log("error")
      });
  }, []) 

  return (
    <div className="App">
      <h1>radio test</h1>
      <Genre chooseGenre = {getStations}/>
      <Stations stations = {allStations} />
    </div>
  );
}

export default App;
