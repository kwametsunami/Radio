import { useState } from 'react'
import Stations from './Stations'

const Genre = () => {

    const [userChoice, setUserChoice] = useState()

    const handleUserChoice = (event) => {
        setUserChoice(event.target.value)
        // console.log(userChoice)
    }

    return (
        <section>
            <form>
                <h2>Choose a genre</h2>
                <select name="genreSelector" id="genreSelector" onChange={handleUserChoice} value={userChoice} defaultValue={""}>
                    <option value="" disabled>Genre</option>
                    <option value="pop">Pop</option>
                    <option value="rock">Rock</option>
                    <option value="indie">Indie</option>
                    <option value="electronic">Electronic</option>
                    <option value="house">House</option>
                    <option value="dance">Dance</option>
                    <option value="hiphop">Hip Hop</option>
                    <option value="rnb">R&B</option>
                    <option value="reggae">Reggae</option>
                    <option value="jazz">Jazz</option>
                    <option value="classical">Classical</option>
                    <option value="folk">Folk</option>
                    <option value="country">Country</option>
                    <option value="blues">Blues</option>
                    <option value="punk">Punk</option>
                    <option value="metal">Metal</option>
                    <option value="experimental">Experimental</option>
                    <option value="community">Community</option>
                    <option value="60s">60s</option>
                    <option value="70s">70s</option>
                    <option value="80s">80s</option>
                    <option value="90s">90s</option>
                    <option value="talk">Talk Radio</option>
                    <option value="news">News</option>
                    <option value="sport">Sports</option>
                </select>
            </form>
            {
                userChoice
                    ? <Stations genre={userChoice} />
                    : null
            }
        </section>
    )
}

export default Genre;