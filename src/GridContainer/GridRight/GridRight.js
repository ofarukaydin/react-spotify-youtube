import React from "react";

const GridRight = props => {
  return (
    <div className="playlist-right-container">
    <div className="playlist-right">
        {props.children}
    </div>
  </div>

  );
};

export default GridRight;
