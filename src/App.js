import './App.css';
import Genre from './Genre';
import { Route, Routes } from 'react-router-dom'


function App() {

  const refresh = () => {
    window.location.reload();
  }

  return (
    <section className="landing">
      <div className='titleContainer wrapper'>
        <h1 className="title" onClick={ refresh }>International Radio</h1>
          <p id="juno">Created at Juno College</p>
      </div>
        <Genre />
    </section>
  );
}



export default App;
