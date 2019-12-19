export interface Album {
  album_type: string;
  artists: {
    href: string;
    id: string;
    name: string;
    type: string;
  }[];
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  total_tracks: number;
  type: string;
}

export interface GetAlbum extends Album {
  tracks: {
    items: Track[];
  };
}

export interface Playlist {
  id: string;
  images: Image[];
  name: string;
  owner: {
    display_name: string;
    href: string;
    id: string;
    type: string;
  };
  type: string;
  tracks: {
    href: string;
    total: string;
  };
  description: string;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface Artist {
  followers: {
    total: number;
  };
  genres: string[];
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
}

export interface Track {
  album: Album;
  artists: Artist[];
  duration_ms: number;
  href: string;
  id: string;
  name: string;
  popularity: string;
  type: string;
}

export interface ISearch {
  albums: {
    href: string;
    items: Album[];
  };
  artists: {
    href: string;
    items: Artist[];
  };
  tracks: {
    href: string;
    items: Track[];
  };
  playlists: {
    href: string;
    items: Playlist[];
  };
}

export type SearchTrackResults = {
  id: string;
  name: string;
  artists: { id: string; name: string }[];
  duration: number;
  album: string;
  albumId: string;
};

export type SearchArtistResults = {
  id: string;
  name: string;
  image: string;
  followers: number;
  genres: string;
  popularity: number;
};

export type SearchAlbumResults = {
  id: string;
  name: string;
  image: string;
};

export type SearchPlaylistResults = {
  image: string;
  id: string;
  name: string;
  owner: string;
  ownerId: string;
  description: string;
};

export interface GetTracks {
  href: string;
  items: {
    added_at: string;
    track: Track;
  }[];
  total: number;
}

export interface Category {
  href: string;
  icons: Image[];
  id: string;
  name: string;
}

export interface Categories {
  categories: {
    href: string;
    items: Category[];
  };
}

export interface CategoryPlaylists {
  playlists: {
    href: string;
    items: Playlist[];
  };
}

export interface FeaturedPlaylists extends CategoryPlaylists {
  message: string;
}

export interface NewReleases {
  albums: {
    href: string;
    items: Album[];
  };
}

export interface ArtistsTopTracks {
  tracks: Track[];
}

export interface SavedAlbums {
  href: string;
  items: {
    added_at: string;
    album: Album;
  }[];
}
