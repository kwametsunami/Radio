import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import '../src/Radio.css';


const Player = (props) => {

  const setDefaultAlert = () => {
    alert("Station region locked. Please select another stream.")
  }

    return (
      <section className='radio'>
        <div className='radioInfo'>
          <p>Now playing:</p>
        </div>
        <div className='radioPlayer'>
          <AudioPlayer
            autoPlay 
            layout="horizontal-reverse"
            showJumpControls = {false}
            onError = {setDefaultAlert}
            src={props.audioSource}/>  
        </div>
      </section>
    )
}

export default Player;