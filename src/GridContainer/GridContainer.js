import React from "react";

const GridContainer = (props) => {
  return (
    <div className="playlist-grid-container">
        {props.children}
    </div>
  );
};

export default GridContainer;
