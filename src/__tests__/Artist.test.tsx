import React from "react";
import Artist from "../Artist/Artist";
import "@testing-library/jest-dom/extend-expect";
import { FetchMock } from "@react-mock/fetch";
import { renderWithRouterAndRedux } from "../utils/withRouterAndRedux";
import {
  mockedArtistPopularTracksData,
  mockedArtistAlbumData,
  mockedArtistInfoData
} from "../utils/mockedArtistData";
import { wait } from "@testing-library/react";

test("Artist component successfully fetches and renders", async () => {
  const { container, getAllByAltText } = renderWithRouterAndRedux(
    <FetchMock
      mocks={[
        {
          matcher:
            "https://api.spotify.com/v1/artists/undefined/top-tracks?country=US",
          method: "GET",
          response: mockedArtistPopularTracksData
        },
        {
          matcher: "https://api.spotify.com/v1/artists/undefined",
          method: "GET",
          response: mockedArtistInfoData
        },
        {
          matcher: "https://api.spotify.com/v1/artists/undefined/albums",
          method: "GET",
          response: mockedArtistAlbumData
        }
      ]}
    >
      <Artist />
    </FetchMock>
  );

  await wait(() => {
    let cover = getAllByAltText("Cover");
    expect(
      container.querySelector(".playlist-right")?.childElementCount
    ).toEqual(11);
    expect(cover).toHaveLength(1);
    expect(
      container.querySelector(".card-grid-container")?.childElementCount
    ).toEqual(11);
  });
});
