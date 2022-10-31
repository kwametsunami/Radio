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