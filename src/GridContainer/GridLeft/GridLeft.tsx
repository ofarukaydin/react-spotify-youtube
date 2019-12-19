import React from "react";

type PropTypes = {
  artistView?: boolean;
  image: string | undefined;
  name: string | undefined;
  owner?: string | undefined;
  description?: string | undefined;
};

const GridLeft = (props: PropTypes) => {
  return (
    <div
      style={
        props.artistView ? { position: "relative", margin: "auto" } : undefined
      }
      className="playlist-left-container"
    >
      <div className="playlist-left">
        <img
          className="playlist-img"
          src={props.image}
          alt="Cover"
          style={props.artistView ? { borderRadius: "50%" } : undefined}
        />
        <p className="playlist-name">{props.name}</p>
        <p className="playlist-owner">{props.owner}</p>
        {props.description ? (
          <p className="playlist-description">{props.description}</p>
        ) : (
          undefined
        )}
      </div>
    </div>
  );
};

export default GridLeft;
