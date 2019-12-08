import "./Layout.css";
import Sidenav from "../Sidenav/Sidenav";
import React from "react";
import Player from "../Player/Player";


const Layout = props => {
  return (
    <>
      <Sidenav />
      <Player />
      <div className="content-container">{props.children}</div>
    </>
  );
};

export default Layout;
