import React, {useEffect, useState} from "react"
import { connect } from "react-redux"
import * as actionTypes from "../../../../store/actions"

const Track = (props) => {

    const [stateUrl, setUrl] = useState("")

    useEffect(() => {
        (async () => {
            const response = await fetch("http://www.farukaydin.xyz/search?q=" + props.artists + " " + props.title)
            const jsonResponse = await response.json();
            setUrl(jsonResponse.url)
        })()

        
        
    }, [stateUrl])

    return (
        <tbody onClick={() => props.onSetTrack(stateUrl)}>
            <tr>              
                <td>{props.title}</td>
                <td>{props.artists}</td>
                <td>{props.album}</td>
                <td>{props.duration}</td>
            </tr>
        </tbody>
    )
}



const mapDispatchToProps = dispatch => {
    return {
        onSetTrack: (trackUrl) => dispatch({ type: actionTypes.SET_TRACK, url: trackUrl }),     
    }
}


export default connect(null, mapDispatchToProps)(Track)