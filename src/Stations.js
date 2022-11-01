import { useState, useEffect } from 'react'

import Player from './Player'
import defaultImage from "./assets/radio.png"

const Stations = (props) => {

    const [allStations, setAllStations] = useState([])
    const [apiError, setApiError] = useState(false)
    console.log(props.genre)

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '6bbc2559b1mshc1912e3c7194fc3p1e32d8jsn71557647197f',
                'X-RapidAPI-Host': 'radio-browser.p.rapidapi.com'
            }
        };

        fetch(`https://radio-browser.p.rapidapi.com/json/stations/search?bitrateMin=192&tag=${props.genre}&order=votes&reverse=true&offset=0&limit=36&hidebroken=false`, options)
            .then(response => response.json(), console.log("heyyyyy"))
            .then(info => {
                
                if (Array.isArray(info)){
                    setAllStations(info) 
                } else {
                    setApiError(!apiError)
                    console.log("this is an error")
                }

                console.log(info)
            })
            .catch((error) => {
                setApiError(!apiError)
            });
    }, [props.genre])
    let radioStation = allStations

    const [radioUrl, setRadioUrl] = useState('')
    const radioSelect = (event) => {
        event.preventDefault()
        setRadioUrl(event.target.value)
    }

    const setDefaultSrc = (event) => {
        event.target.src = defaultImage
    }
    return (
        <section className='stationContainer wrapper'>
            {
                apiError
                    ? <h2>Please try again later</h2>
                    : <h2>Select a station</h2>
            }
            {
                apiError
                ? ''
                : <div className='stationList wrapper'>
                        {allStations.map((stationDetails) => {
                            return (
                                <div className="stationInfo" key={stationDetails.id}>
                                    <div className="image">
                                        <img className="icon" src={stationDetails.favicon} alt={stationDetails.name} onError={setDefaultSrc} />
                                    </div>
                                    <div className='information'>
                                        <p>{stationDetails.name}</p>
                                        {
                                            stationDetails.country
                                                ? <p>{stationDetails.country}</p>
                                                : <p>Country not listed</p>
                                        }
                                    </div>
                                    <div className='buttonContainer'>
                                        <button
                                            className={radioUrl === stationDetails.url_resolved
                                                ? "infoButtonPlaying"
                                                : "infoButton"
                                            }
                                            value={stationDetails.url_resolved}
                                            onClick={radioSelect}>
                                            {
                                                radioUrl === stationDetails.url_resolved
                                                    ? ""
                                                    : "▶"
                                            }
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
            }
            
            {
                radioUrl
                ? <Player audioSource={radioUrl} />
                : null
            }
            
        </section>
    )
}

export default Stations;