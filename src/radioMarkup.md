<!-- APP.JS -->

import './App.css';
import { useEffect, useState } from 'react';
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
      })
      .catch((error) => {
        console.log("error")
      });
  }, []) 

  return (
    <div className="App">
      <h1>radio test</h1>
      <Genre chooseGenre = {getStations} />
      <Stations stations = {allStations} />
    </div>
  );
}

export default App;


<!-- GENRE.JS -->
import { useState } from 'react'

const Genre = (props) => {

    const [ userChoice, setUserChoice ] = useState('placeholder')

    const handleUserChoice = (event) => {
        setUserChoice(event.target.value)
    }

    return (
        <form onSubmit={ (event) => props.chooseGenre(event, userChoice) }>
            <h2>Select a genre</h2>
            <select name="genreSelector" id="genreSelector" onChange={handleUserChoice} value={userChoice}>
                <option value="placeholder" disabled>Genre</option>
                <option value="pop">Pop</option>
                <option value="rock">Rock</option>
                <option value="jazz">Jazz</option>
                <option value="hiphop">Hip Hop</option>
                <option value="retro">Retro</option>
            </select>
            <button type="submit">Display stations</button>
        </form>
    )
}

export default Genre;

<!-- STATIONS.JS -->
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import {useState} from 'react'

import Player from './Player'

const Stations = (props) => {
    // console.log(props.stations[0].name)
    const stationInfo = []
        for (let i = 0; i < props.stations.length; i++){
            stationInfo.push(props.stations[i])
        }
    console.log(stationInfo)
    const [radioUrl, setRadioUrl] = useState('http://strm112.1.fm/back280s_mobile_mp3')
    const radioSelect = (event) => {
        event.preventDefault()
        setRadioUrl(event.target.value)
        console.log("this button has been clicked")
    }
    return(
        <section>
            <h2>Select a station</h2>
            <div className='stationList wrapper'>
                {props.stations.map ((stationDetails) => {
                    return (
                        <div className="stationInfo" key={stationDetails.id}>
                            <p>{stationDetails.name}</p>
                            <p>{stationDetails.country}</p>
                            <button className="infoButton" value={stationDetails.url} onClick ={radioSelect}>play this station</button>

                            {/* <AudioPlayer 
                            src={stationDetails.url}/> */}
                        </div>
                    )
                })}
            </div>
            <Player audioSource = {radioUrl}/>
        </section>
    )
}

export default Stations;

<!-- PLAYER.JS -->
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'


const Player = (props) => {
    console.log(props.audioSource)
    return (
      <div className='radioPlayer'>
        <AudioPlayer
          autoPlay 
          src={props.audioSource}/>  
      </div>
    )
}

export default Player;







<!-- RADIO API EXPERIMENT -->

<!-- APP.JS -->
import './App.css';
import { useEffect, useState } from 'react';
import Genre from './Genre';
import Stations from './Stations';


function App() {

  return (
    <div className="App">
      <h1>radio test</h1>
      <Genre />
    </div>
  );
}

export default App;

<!-- GENRE.JS -->
import { useState } from 'react'
import Stations from './Stations'

const Genre = () => {

    const [ userChoice, setUserChoice ] = useState()

    const handleUserChoice = (event) => {
        setUserChoice(event.target.value)
    }

    return (
        <section>
        <form>
            <h2>Select a genre</h2>
            <select name="genreSelector" id="genreSelector" onChange={handleUserChoice} value={userChoice}>
                <option value="placeholder" disabled>Genre</option>
                <option value="pop">Pop</option>
                <option value="rock">Rock</option>
                <option value="jazz">Jazz</option>
                <option value="hiphop">Hip Hop</option>
                <option value="retro">Retro</option>
            </select>
        </form>
        {
            userChoice
            ? <Stations genre={userChoice}/> 
            : null
        }
        </section>
    )
}

export default Genre;

<!-- STATIONS.JS -->
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import {useState, useEffect} from 'react'

import Player from './Player'

const Stations = (props) => {

    const [allStations, setAllStations] = useState([])
    const [error, setError] = useState(false)

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '8e4a9bbd26msh31ec88528a1bb51p195af6jsn4f715f3b0e33',
                'X-RapidAPI-Host': 'radio-browser.p.rapidapi.com'
            }
        };

        fetch(`https://radio-browser.p.rapidapi.com/json/stations/search?&bitrateMin=192&tag=${props.genre}&reverse=false&offset=0&limit=10&hidebroken=false`, options)
            // countrycode=ca&tag=jazz
            .then(response => response.json(), console.log("heyyyyy"))
            .then(info => {
                console.log(info)
                if (info.length = 0)
                { setError = true }
                const radioStations = info

                setAllStations(radioStations)
            })
            .catch((error) => {
                console.log("error")
            });
    }, []) 
    
    const stations = allStations

    console.log(stations[0])
    console.log(allStations[0])

    const [radioUrl, setRadioUrl] = useState('http://strm112.1.fm/back280s_mobile_mp3')
    const radioSelect = (event) => {
        event.preventDefault()
        setRadioUrl(event.target.value)
        console.log("this button has been clicked")
    }
    return(
        <section>
            <h2>Select a station</h2>
        </section>
    )}

export default Stations;

<!-- PLAYER.JS -->
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'


const Player = (props) => {
    console.log(props.audioSource)
    return (
      <div className='radioPlayer'>
        <AudioPlayer
          autoPlay 
          src={props.audioSource}/>  
      </div>
    )
}

export default Player;










                                                radioUrl === stationDetails.url_resolved
                                                ? "infoButtonPlaying"
                                                : "infoButton"