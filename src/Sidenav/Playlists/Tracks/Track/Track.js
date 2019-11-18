import React from "react"


const Track = (props) => {



    return (
        <tbody>
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