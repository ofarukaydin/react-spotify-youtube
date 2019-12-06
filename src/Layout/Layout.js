import "./Layout.css";
import Sidenav from "../Sidenav/Sidenav";
import React from "react";
import Player from "../Player/Player";
import { withWidth, Grid } from '@material-ui/core';
import styled from 'styled-components';

const GridHomePage = styled(Grid)`
  padding-bottom: 90px;
  padding-left: 180px;
  padding-top: 10px;
  width: 100%;
  color: white;
`;

const Layout = props => {
  return (
    <>
      <Sidenav />
      <Player />

      
        <Grid container>
          <GridHomePage item lg={12}>
            {props.children}
          </GridHomePage>
        </Grid>

    </>
  );
};

export default Layout;
