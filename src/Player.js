import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

// import ReactDOM from 'react-dom';
// import { SpectrumVisualizer, SpectrumVisualizerTheme } from 'react-audio-visualizers';

const Player = (props) => {
    console.log(props.audioSource)
    return (
      <div>
        <AudioPlayer
          autoPlay 
          src={props.audioSource}/>  
        {/* <SpectrumVisualizer
          audio={props.audioSource}
          theme={SpectrumVisualizerTheme.radialSquaredBars}
          colors={['#009688', '#26a69a']}
          iconsColor="#26a69a"
          backgroundColor="white"
          showMainActionIcon
          showLoaderIcon
          highFrequency={8000}
        /> */}
      </div>
    )
}

export default Player;