import {
  SearchTrackResults,
  SearchAlbumResults,
  SearchArtistResults,
  SearchPlaylistResults,
  ISearch,
  GetAlbum,
  GetTracks,
  Artist,
  ArtistsTopTracks,
  Categories,
  CategoryPlaylists,
  FeaturedPlaylists,
  NewReleases,
  Playlist,
  SavedAlbums
} from "./interfaces";

let spotifyAccesToken = "";
// Please provide the client ID of your Spotify App.
const clientId = process.env.REACT_APP_SPOTIFY_ID;
//Please provide the redirect URI added in your Spotify App while registration.
const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;

const Spotify = {
  // Get the access token using authorize API from Sportify.
  getAccessToken() {
    const scopes =
      "ugc-image-upload user-read-playback-state streaming user-read-email playlist-read-collaborative user-modify-playback-state user-read-private playlist-modify-public user-library-modify user-top-read user-read-currently-playing playlist-read-private user-follow-read app-remote-control user-read-recently-played playlist-modify-private user-follow-modify user-library-read";
    if (spotifyAccesToken) {
      return spotifyAccesToken;
    }
    const accessToken = window.location.href.match(/access_token=([^&]*)/);
    const expiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if (accessToken && expiresIn) {
      spotifyAccesToken = accessToken[1];
      let expiryTime = Number(expiresIn[1]);
      window.setTimeout(() => (spotifyAccesToken = ""), expiryTime * 1000);
      window.history.pushState("Access Token", "", "/");
      return spotifyAccesToken;
    } else {
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(
        scopes
      )}&response_type=token`;
    }
  },

  // Search for a track from Spotify
  async searchAll(term: string) {
    let searchTrackResults: SearchTrackResults[] = [];
    let searchAlbumResults: SearchAlbumResults[] = [];
    let searchArtistResults: SearchArtistResults[] = [];
    let searchPlaylistResults: SearchPlaylistResults[] = [];

    try {
      const token = this.getAccessToken();
      const response = await fetch(
        `https://api.spotify.com/v1/search?type=track,album,playlist,artist&q=${term}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const jsonResponse: ISearch = await response.json();

      if (jsonResponse.tracks && jsonResponse.tracks.items) {
        searchTrackResults = jsonResponse.tracks.items.map((track, index) => {
          const artistList = track.artists.map((artistElement): {
            id: string;
            name: string;
          } => {
            return { name: artistElement.name, id: artistElement.id };
          });

          return {
            id: track.id,
            name: track.name,
            artists: artistList,
            duration: track.duration_ms,
            album: track.album.name,
            albumId: track.album.id
          };
        });
      }
      if (jsonResponse.albums && jsonResponse.albums.items) {
        searchAlbumResults = jsonResponse.albums.items.map(album => {
          return { id: album.id, name: album.name, image: album.images[0].url };
        });
      }

      if (jsonResponse.artists && jsonResponse.artists.items) {
        searchArtistResults = jsonResponse.artists.items.map(artist => {
          return {
            id: artist.id,
            name: artist.name,
            image: artist.images.map(image => image.url)[0],
            followers: artist.followers.total,
            genres: artist.genres.join(", "),
            popularity: artist.popularity
          };
        });
      }

      if (jsonResponse.playlists && jsonResponse.playlists.items) {
        searchPlaylistResults = jsonResponse.playlists.items.map(playlist => {
          return {
            image: playlist.images[0].url,
            id: playlist.id,
            name: playlist.name,
            owner: playlist.owner.display_name,
            ownerId: playlist.owner.id,
            description: playlist.description
          };
        });
      }
      return {
        albums: searchAlbumResults,
        playlists: searchPlaylistResults,
        tracks: searchTrackResults,
        artists: searchArtistResults
      };
    } catch (e) {
      console.log("Error occured in search");
    }

    // To workaround for returning Promise<never[]>
    const result = {
      albums: [],
      artists: [],
      playlists: [],
      tracks: []
    };
    return result;
  },

  // Save the play list to Spotify account.
  // return true if playlist created successfully.
  /*   async savePlaylist(name, trackURIs) {
    try {
      if (name && trackURIs) {
        const token = this.getAccessToken();
        const userId = await this.getUserId(token);
        if (userId) {
          //create Playlist
          const playlistID = await this.createPlayList(token, userId, name);
          if (playlistID) {
            //add tracks
            return await this.addTracks(token, userId, playlistID, trackURIs);
          }
        }
      }
    } catch (e) {
      console.log("Error occure while saving the playlist");
      console.log(e);
    }
    return false;
  }, */

  // Get user Id of logged in account user.
  async getUserId(token: string) {
    const headers = {
      Authorization: `Bearer ${token}`
    };
    let userId = "";
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: headers
    });
    const jsonResponse = await response.json();
    if (jsonResponse) {
      userId = jsonResponse.id;
    }
    return userId;
  },

  // Create a play list with given name and return it's ID
  /*   async createPlayList(token, userId, name) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json"
    };
    //create Playlist
    let playlistID = "";
    const response = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        body: JSON.stringify({ name: name }),
        headers: headers,
        method: "POST"
      }
    );
    const jsonResponse = await response.json();
    if (jsonResponse) {
      playlistID = jsonResponse.id;
    }
    return playlistID;
  }, */

  async getPlayList() {
    const token = this.getAccessToken();
    if (token) {
      const userId = await this.getUserId(token);
      const headers = {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json"
      };
      const response = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          headers: headers,
          method: "GET"
        }
      );
      const jsonResponse: ISearch["playlists"] = await response.json();
      return jsonResponse;
    }
  },

  async getTracks(id: string) {
    const token = this.getAccessToken();
    if (token) {
      const userId = await this.getUserId(token);
      const headers = {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json"
      };
      const response = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists/${id}/tracks`,
        {
          headers: headers,
          method: "GET"
        }
      );
      const jsonResponse: GetTracks = await response.json();
      return jsonResponse;
    }
  },

  async getCategories() {
    const token = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json"
    };
    const response = await fetch(
      `https://api.spotify.com/v1/browse/categories`,
      {
        headers: headers,
        method: "GET"
      }
    );
    const jsonResponse: Categories = await response.json();
    return jsonResponse;
  },

  async getCategoryPlaylists(id: string) {
    const token = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json"
    };
    const response = await fetch(
      `https://api.spotify.com/v1/browse/categories/${id}/playlists`,
      {
        headers: headers,
        method: "GET"
      }
    );
    const jsonResponse: CategoryPlaylists = await response.json();
    return jsonResponse;
  },

  async getFeaturedPlaylists() {
    const token = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json"
    };
    const response = await fetch(
      `https://api.spotify.com/v1/browse/featured-playlists`,
      {
        headers: headers,
        method: "GET"
      }
    );
    const jsonResponse: FeaturedPlaylists = await response.json();
    return jsonResponse;
  },

  async getNewReleases() {
    const token = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json"
    };
    const response = await fetch(
      `https://api.spotify.com/v1/browse/new-releases`,
      {
        headers: headers,
        method: "GET"
      }
    );
    const jsonResponse: NewReleases = await response.json();
    return jsonResponse;
  },

  async getAlbums(id: string) {
    const token = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json"
    };
    const response = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
      headers: headers,
      method: "GET"
    });
    const jsonResponse: GetAlbum = await response.json();

    return jsonResponse;
  },

  async getPlaylistDetails(id: string) {
    const token = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json"
    };
    const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
      headers: headers,
      method: "GET"
    });
    const jsonResponse: Playlist = await response.json();
    return jsonResponse;
  },

  async getArtist(id: string) {
    const token = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json"
    };
    const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
      headers: headers,
      method: "GET"
    });
    const jsonResponse: Artist = await response.json();
    return jsonResponse;
  },

  async getArtistsTopTracks(id: string) {
    const token = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json"
    };
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`,
      {
        headers: headers,
        method: "GET"
      }
    );
    const jsonResponse: ArtistsTopTracks = await response.json();
    return jsonResponse;
  },

  async getArtistsAlbums(id: string) {
    const token = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json"
    };
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${id}/albums`,
      {
        headers: headers,
        method: "GET"
      }
    );
    const jsonResponse: ISearch["albums"] = await response.json();
    return jsonResponse;
  },

  async getSavedAlbums() {
    const token = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json"
    };
    const response = await fetch(`https://api.spotify.com/v1/me/albums`, {
      headers: headers,
      method: "GET"
    });
    const jsonResponse: SavedAlbums = await response.json();
    return jsonResponse;
  },

  async getLikedSongs() {
    const token = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json"
    };
    const response = await fetch(`https://api.spotify.com/v1/me/tracks`, {
      headers: headers,
      method: "GET"
    });
    const jsonResponse: GetTracks = await response.json();
    return jsonResponse;
  }

  // Add tracks to an existing playlist.
  /*   async addTracks(token, userId, playlistID, trackURIs) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json"
    };
    const response = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`,
      {
        body: JSON.stringify(trackURIs),
        headers: headers,
        method: "POST"
      }
    );
    const jsonResponse = await response.json();
    if (jsonResponse && jsonResponse.snapshot_id) {
      console.log("tracks added successfully");
      return true;
    }
    return false;
  } */
};
export default Spotify;
