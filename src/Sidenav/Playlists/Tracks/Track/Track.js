import React, {useEffect, useState} from "react"
import { Media, Player, controls } from 'react-media-player'

const { PlayPause, MuteUnmute } = controls

const Track = (props) => {

    const [stateUrl, setUrl] = useState("")

    useEffect(() => {
        (async () => {
            const response = await fetch("http://www.farukaydin.xyz/search?q=" + props.artists + " " + props.title)
            const jsonResponse = await response.json();
            setUrl(jsonResponse.url)
        })()

        
        
    }, [stateUrl])

    const play = (
        <Media>
        <div className="media">
          <div className="media-player">
            <Player src={stateUrl} />
          </div>
          <div className="media-controls">
            <PlayPause />
            <MuteUnmute />
          </div>
        </div>
      </Media>
    )

    return (
        <tbody onClick={play}>
            {play}
            <tr>              
                <td>{props.title}</td>
                <td>{props.artists}</td>
                <td>{props.album}</td>
                <td>{props.addedAt}</td>
                <td>{props.duration}</td>
            </tr>
        </tbody>
    )
}

export default Track