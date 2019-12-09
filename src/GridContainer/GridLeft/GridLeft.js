import React from "react";

const GridLeft = props => {
  return (
    <div style={props.artistView ? {position: "relative", margin: "auto"} : null} className="playlist-left-container">
      <div className="playlist-left">
        <img
          className="playlist-img"
          src={props.image}
          alt="Cover"
          style={props.artistView ? {borderRadius: "50%"} : null}
        />
        <p className="playlist-name">{props.name}</p>
        <p className="playlist-owner">{props.owner}</p>
        {props.description ? <p className="playlist-description">{props.description}</p> : null}
      </div>
    </div>
  );
};

export default GridLeft;
