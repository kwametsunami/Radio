import { useState, useEffect } from 'react'

import Player from './Player'

import defaultImage from "./assets/radio.png"

const Stations = (props) => {

    const [allStations, setAllStations] = useState([])
    const [apiError, setApiError] = useState(false)

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '6bbc2559b1mshc1912e3c7194fc3p1e32d8jsn71557647197f',
                'X-RapidAPI-Host': 'radio-browser.p.rapidapi.com'
            }
        };

        fetch(`https://radio-browser.p.rapidapi.com/json/stations/search?bitrateMin=192&tag=${props.genre}&order=votes&reverse=true&offset=0&limit=36&hidebroken=false`, options)
            .then(response => response.json())
            .then(info => {        
                if (Array.isArray(info)){
                    setAllStations(info) 
                } else {
                    setApiError(!apiError)
                }
            })
            .catch((error) => {
                setApiError(!apiError)
            });
    }, [props.genre, apiError])

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
                    ? <h2>Oh no! We're having an issue. Please refresh, then try again later.</h2>
                    : <h2>Choose a station</h2>
            }
            {
                apiError
                ? <div>
                    <h3>The server is currently overloaded with requests. In the meantime, here's some music to enjoy.</h3>
                    <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/pxw-5qfJ1dk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div> 
                : <div className='stationList wrapper'>
                        {allStations.map((stationDetails) => {
                            return (

                                <div className={radioUrl === stationDetails.url_resolved
                                    ? "stationInfoPlaying"
                                    : "stationInfo"
                                } key={stationDetails.id}>
                                    <div className="image">
                                        <img className="icon" src={stationDetails.favicon} alt={stationDetails.name} onError={setDefaultSrc} />
                                    </div>

                                    <div className='information'>
                                        <p className='stationName'>{stationDetails.name}</p>
                                        {
                                            stationDetails.country
                                                ? <p className='stationCountry'>{stationDetails.country}</p>
                                                : <p className='stationCountry'>Country not listed</p>
                                        }
                                    </div>

                                    <div className='buttonContainer' value={stationDetails}>
                                        <button
                                            className={
                                                radioUrl === stationDetails.url_resolved
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
                ? <Player audioSource={radioUrl}/>
                : null
            }
            
        </section>
    )
}

export default Stations;