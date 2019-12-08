import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Tracks from "./Sidenav/Playlists/Tracks/Tracks";
import Layout from "./Layout/Layout";
import Home from "./Home";
import Album from "./Album/Album.js";
import Browse from "./Browse/Browse";
import NewReleases from "./Browse/NewReleases/NewReleases";
import FeaturedPlaylists from "./Browse/FeaturedPlaylists/FeaturedPlaylists";
import Categories from "./Browse/Categories/Categories";
import CategoryPlaylists from "./Browse/CategoryPlaylists/CategoryPlaylist";

const App = props => {
  return (
    <BrowserRouter>
      <Layout {...props}>
        <Route path={"/browse"} component={Browse} />
        <Route path="/browse/categories" component={Categories} />
        <Route path="/browse/featured" component={FeaturedPlaylists} />
        <Route path="/browse/new" component={NewReleases} />
        <Route
          exact
          path="/categories/:categoryId"
          component={CategoryPlaylists}
        />
        <Route exact path={"/playlists/:playlistId"} component={Tracks} />
        <Route exact path={"/albums/:albumId"} component={Album} />
        <Route exact path="/" component={Home} />
      </Layout>
    </BrowserRouter>
  );
};

export default App;
