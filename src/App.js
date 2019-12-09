import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Tracks from "./Sidenav/Playlists/Tracks/Tracks";
import Layout from "./Layout/Layout";
import Album from "./Album/Album.js";
import Browse from "./Browse/Browse";
import NewReleases from "./Browse/NewReleases/NewReleases";
import FeaturedPlaylists from "./Browse/FeaturedPlaylists/FeaturedPlaylists";
import Categories from "./Browse/Categories/Categories";
import CategoryPlaylists from "./Browse/CategoryPlaylists/CategoryPlaylist";
import Artist from "./Artist/Artist";
import Library from "./Library/Library";
import Albums from "./Library/Albums/Albums";
import Playlists from "./Library/Playlists/Playlists";
import LikedSongs from "./Library/LikedSongs/LikedSongs";
import Search from "./Search/Search";

const App = props => {
  return (
    <BrowserRouter>
      <Layout {...props}>
        <Route path="/browse" component={Browse} />
        <Route path="/browse/categories" component={Categories} />
        <Route path="/browse/featured" component={FeaturedPlaylists} />
        <Route path="/browse/new" component={NewReleases} />
        <Route path="/library" component={Library} />
        <Route path="/library/albums" component={Albums} />
        <Route path="/library/playlists" component={Playlists} />
        <Route path="/library/liked" component={LikedSongs} />
        <Route path="/search" component={Search} />
        <Route
          exact
          path="/categories/:categoryId"
          component={CategoryPlaylists}
        />
        <Route exact path={"/playlists/:playlistId"} component={Tracks} />
        <Route exact path={"/albums/:albumId"} component={Album} />
        <Route exact path={"/artists/:artistId"} component={Artist} />
        <Route exact path="/" component={LikedSongs} />
      </Layout>
    </BrowserRouter>
  );
};

export default App;
