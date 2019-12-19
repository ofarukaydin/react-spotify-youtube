import React from "react";

const GridContainer = (props: { children: React.ReactNode }) => {
  return <div className="playlist-grid-container">{props.children}</div>;
};

export default GridContainer;
