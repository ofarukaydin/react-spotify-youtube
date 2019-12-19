import React from "react";

const GridCardContainer = (props: { children: React.ReactNode }) => {
  return <div className="card-grid-container">{props.children}</div>;
};

export default GridCardContainer;
