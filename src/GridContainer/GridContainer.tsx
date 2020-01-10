import React from "react";
import { Palette } from "node-vibrant/lib/color";

const GridContainer = (props: {
  children: React.ReactNode;
  palette?: Palette;
}) => {
  const [r, b, g, a = 0.5] = [
    props.palette?.LightMuted?.r,
    props.palette?.LightMuted?.b,
    props.palette?.LightMuted?.g
  ];
  return (
    <div
      className="playlist-grid-container"
      style={{
        ["--color" as any]: r && g && b ? `rgba(${r},${g},${b},${a})` : ""
      }}
    >
      {props.children}
    </div>
  );
};

export default GridContainer;
