import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Tracks from "./Sidenav/Playlists/Tracks/Tracks";
import Categories from "./Categories/Categories.js";
import Layout from "./Layout/Layout";
import Home from "./Home";
import CategoryPlaylists from "./CategoryPlaylists/CategoryPlaylist"
import FeaturedPlaylists from "./FeaturedPlaylists/FeaturedPlaylists"

const App = props => {
  return (
    <BrowserRouter>
      <Layout {...props}>
        <Route exact path="/categories" component={Categories} />
        <Route exact path="/featured" component={FeaturedPlaylists} />
        <Route exact path="/categories/:categoryId" component={CategoryPlaylists} />
        <Route exact path={"/playlists/:playlistId"} component={Tracks} />
        <Route exact path="/" component={Home} />
      </Layout>
    </BrowserRouter>
  );
};

export default App;
