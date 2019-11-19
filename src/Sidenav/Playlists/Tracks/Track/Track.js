import React, {useEffect, useState} from "react"

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
        <tbody>
            <tr>              
                <td>{props.title}</td>
                <td>{props.artists}</td>
                <td>{props.album}</td>
                <td>{props.duration}</td>
            </tr>
        </tbody>
    )
}

export default Track