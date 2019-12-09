import React from "react";
import { Link } from "react-router-dom";
import "./CardMedia.css"

const Card = props => {
  let image = `url("${props.image}")`;
  return (
    <div className="card">
      <Link to={props.url}>
        <div
          className="card-image"
          style={props.artistView ? { borderRadius: "50%", width: props.width ? props.width : "254px", height: props.height ? props.height : "254px", backgroundImage: image } : { width: props.width ? props.width : "254px", height: props.height ? props.height : "254px", backgroundImage: image }}        />
        <p className="card-title">{props.title}</p>
      </Link>
      {props.description ? (
        <p className="card-description">{props.description}</p>
      ) : null}
    </div>
  );
};

export default Card;
