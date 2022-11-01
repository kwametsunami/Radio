import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import '../src/Radio.css';


const Player = (props) => {
    return (
      <div className='radioPlayer'>
        <AudioPlayer
          autoPlay 
          layout="horizontal-reverse"
          showJumpControls = {false}
          src={props.audioSource}/>  
      </div>
    )
}

export default Player;