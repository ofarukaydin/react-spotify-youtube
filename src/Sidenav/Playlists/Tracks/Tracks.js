import React, { useEffect, useState } from "react"
import Spotify from "../../../Spotify/Spotify"
import { useParams } from "react-router-dom"
import Track from "./Track/Track"
import styles from "./Tracks.module.css"

const Tracks = (props) => {

    const [Tracks, setTracks] = useState([])
    const params = useParams()
    useEffect(
        () => {
            (async () => {
                let tracks = await Spotify.getTracks(params.playlistId)
                const tracksList = tracks.items.map((trackElement) => {
                    const artistList = trackElement.track.artists.map((artistElement) => {
                        return artistElement.name
                    })
                    
                    return {
                        title: trackElement.track.name,
                        artists: artistList.join(", "),
                        album: trackElement.track.album.name,
                        duration: trackElement.track.duration_ms,
                        addedAt: trackElement.added_at.slice(0, 10)
                    }
                })
                setTracks(tracksList)
            })()

        }, [params.playlistId])



    const trackElements = Tracks.map(track => <Track key={track.duration} title={track.title} addedAt={track.addedAt} artists={track.artists} album={track.album} duration= {track.duration} />)


    return (

        <table className={styles.Tracklist}>
            <tbody>
                <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Artist</th>
                    <th>Album</th>
                    <th>Duration</th>
                </tr>
            </tbody>
            {trackElements}
        </table>

    )


}



export default Tracks
