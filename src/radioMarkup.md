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







<!-- RADIO.CSS -->

.radioPlayer {
    border: 3px solid black;
    border-radius: 25px;
}

.rhap_additional-controls {
    display: none;
}

.rhap_total-time {
    display: none;
}

.rhap_main {
    background-color: #424242;
}

.rhap_main-controls {
    position: relative;
    left: 22.5%;
}

.rhap_container {
    background-color: #424242;
    padding: 12.5px;
    border-radius: 20px;
}

.rhap_progress-indicator {
    background-color: #d64b4b;
    border: 2px solid #1e2021;
}

.rhap_progress-bar {
    background-color: #ede8e7;
    /* display */
}

#rhap_current-time {
    color: #ede8e7;
    display: inline;
}

.rhap_button-clear {
    color: #ede8e7;
}

.rhap_play-pause-button {
    position: relative;
    left: -50%;
}

.rhap_volume-indicator {
    background-color: #d64b4b;
    border: 2px solid #1e2021;
}

.rhap_horizontal-reverse {
    margin: 0
}

.rhap_volume-bar-area {
    display: inherit;
}
    
.rhap_progress-section {
    display: inline-flex
}



@media (max-width: 850px) {

    .rhap_horizontal-reverse {
        margin: 0 auto;
    }

    .rhap_volume-bar-area {
        display: none;
    }

    #rhap_current-time {
        display: none;
    }

    .rhap_progress-bar {
        display: none;
    }

    .rhap_progress-section {
        display: none;
    }
}


<!-- APP.CSS -->

html{line-height:1.15;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,footer,header,nav,section{display:block}h1{font-size:2em;margin:.67em 0}figcaption,figure,main{display:block}figure{margin:1em 40px}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent;-webkit-text-decoration-skip:objects}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:inherit}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}dfn{font-style:italic}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}audio,video{display:inline-block}audio:not([controls]){display:none;height:0}img{border-style:none}svg:not(:root){overflow:hidden}button,input,optgroup,select,textarea{font-family:sans-serif;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button,html [type=button],[type=reset],[type=submit]{-webkit-appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{display:inline-block;vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details,menu{display:block}summary{display:list-item}canvas{display:inline-block}template{display:none}[hidden]{display:none}

html { box-sizing: border-box;}

*, *:before, *:after {box-sizing: inherit}

.sr-only { position: absolute; width: 1px; height: 1px; margin: -1px; border: 0; padding: 0; white-space: nowrap; clip-path: inset(100%); clip: rect(0 0 0 0); overflow: hidden;}

.App {
  text-align: center;
  font-family: 'Poppins', sans-serif;
}

body {
  font-size: 62.5%;
  color: #ede8e7;
  background-color: #1e2021;
  border: 35px solid black;
  height: 100%;
  padding-bottom: 50px;
}

.wrapper {
  max-width: 1200;
  width: 90%;
  margin: 0 auto;
}

h1 {
  font-size: 3rem;
  font-family: 'Michroma', sans-serif;
}

h2 {
  font-size: 2rem;
}

h3 {
  font-size: 1rem;
}

p {
  font-size: 1rem;
}

.genreContainer {
  text-align: center;
}

select {
  width: 20%;
  padding: 15px;
  font-size: 1.5rem;
  border-radius: 15px;
  text-align: center;
}

.stationContainer {
  text-align: center;
}

.stationContainer h2 {
  font-size: 1.5rem;
}

.stationList {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15vh;
}

.stationInfo {
  display: flex;
  width: calc((100%/3) - 30px);
  margin: 10px;
  border: 4px solid #09a9f4;
  border-radius: 20px;
  background-color: #ebe7e7;
}

.stationInfoPlaying {
  display: flex;
  width: calc((100%/3) - 30px);
  margin: 10px;
  border: 4px solid #d64b4b;
  border-radius: 20px;
  background-color: #ebe7e7;
}

.stationInfo p {
  margin: 0;
  padding: 5px 0;
  color: #1e2021;
}

.stationInfoPlaying p {
  margin: 0;
  padding: 5px 0;
  color: #1e2021;
}



.image {
  width: 25%;
  margin: 0 15px;
  display: flex;
  align-content: center;
  justify-content: center;
}

.image img {
  margin: auto 0;
  width: 70px;
  height: 70px;
}

.information {
  display: flex;
  flex-direction: column;
  width: 50%;
  align-content: flex-start;
  justify-content: center;
  text-align: left;
  padding: 10px 0;
}

.stationName {
  font-weight: 900;
}

.stationCountry {
  font-weight: 500;
}

.buttonContainer {
  display: flex;
  justify-content: center;
  align-content: center;
  width: 25%;
}

.infoButton {
  width: 60px;
  height: 60px;
  margin: 10px;
  font-size: 1.5rem;
  position: relative;
  border: 5px solid #1e2021;
  color: #d64b4b;
  border-radius: 150px;
  background-color: transparent;
  align-self: center;
  padding: 5px 0 0 5px;
}

.infoButtonPlaying {
  margin: 10px auto;
  padding: 7px 12px;
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 150px;
  border: 5px solid #1e2021;
  background-color: transparent;
  font-family: 'Poppins', sans-serif;
  background-image: url('./assets/soundBars.gif');
  background-size: 30px;
  background-repeat: no-repeat;
  background-position: center;
  display: inline-block;
  align-self: center;
}

.radioPlayer {
  position: fixed;
  bottom: 2%;
  left: 30vw;
  width: 40%;
}

@media (max-width: 1250px) {
  .stationInfo, .stationInfoPlaying {
    width: calc((100%/2) - 35px)
  }
}

@media (max-width: 850px) {

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 1.25rem;
  }

  p {
    font-size: 0.75rem;
  }

  .stationContainer h2 {
    font-size: 1rem;
  }

  .image img {
    width: 45px;
    height: 45px;
  }

  .infoButton, .infoButtonPlaying {
    width: 45px;
    height: 45px;
    border: 3px solid #1e2021; 
  }

  select {
    padding: 7.5px;
    font-size: 1rem;
  }

}

@media (max-width: 700px) {
  .infoButton, .infoButtonPlaying {
      width: 30px;
      height: 30px;
      font-size: 1rem;
      padding: 0;
      margin: 0;
      border: none;
    }
}

@media (max-width: 650px) {

  select {
    font-size: 0.7rem;
    padding: 15px;
    width: 25%;
  }

  p {
    font-size: 0.5rem;
  }

  .stationList {
    justify-content: center;
  }

  .stationInfo, .stationInfoPlaying {
      width: 75%;
    }

  .image img {
    width: 30px;
    height: 30px;
  }

    .infoButton, .infoButtonPlaying {
      font-size: .75rem;
      padding: 5px;
      margin: 15px;
      border: 3px solid #1e2021;
    }

  .infoButtonPlaying {
    background-size: 12px;
  }
}

@media (max-width: 400px) {

  select {
    width: 35%;
    font-size: 0.5rem;
    padding: 5px;
  }

  h1 {
    font-size: 1.5rem;
  }

  h2 {
    font-size: 0.75rem;
  }

  .stationContainer h2 {
    font-size: 0.5rem;
  }

  .infoButton, .infoButtonPlaying {
    padding: 5px;
    margin: 15px;
    border: none;
    width: 20px;
    height: 20px;
  }
}

@media (max-width: 300px) {
  .stationInfo, .stationInfoPlaying {
      width: 90%;
    }
}
