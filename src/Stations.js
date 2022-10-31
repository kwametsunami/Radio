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