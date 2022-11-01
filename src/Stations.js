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
                'X-RapidAPI-Key': '8e4a9bbd26msh31ec88528a1bb51p195af6jsn4f715f3b0e33',
                'X-RapidAPI-Host': 'radio-browser.p.rapidapi.com'
            }
        };

        fetch(`https://radio-browser.p.rapidapi.com/json/stations/search?bitrateMin=192&tag=${props.genre}&order=votes&reverse=true&offset=0&limit=36&hidebroken=false`, options)
            .then(response => response.json(), console.log("heyyyyy"))
            .then(info => {
                console.log(info)
            
                if (info === {}) 
                {setApiError(!apiError)
                    console.log("this is an error")
                 }
                setAllStations(info)
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
            <div className='stationList wrapper'>
                {radioStation.map((stationDetails) => {
                    return (
                        <div className="stationInfo" key={stationDetails.id}>
                            <div className="image">
                                <img className="icon"src={stationDetails.favicon} alt={stationDetails.name} onError={setDefaultSrc}/>
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
                                className={radioUrl === stationDetails.url
                                ? "infoButtonPlaying"
                                : "infoButton"
                                } 
                                value={stationDetails.url} 
                                onClick={radioSelect}>
                                    {
                                        radioUrl === stationDetails.url
                                            ? ""
                                            : "▶"
                                    }
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
            {
                radioUrl
                ? <Player audioSource={radioUrl} />
                : null
            }
            
        </section>
    )
}

export default Stations;