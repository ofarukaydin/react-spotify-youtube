import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { FetchMock } from "@react-mock/fetch";
import { renderWithRouterAndRedux } from "../utils/withRouterAndRedux";
import { mockedPlaylistDetailsData } from "../utils/mockedPlaylistDetailsData";
import { mockedTracksData } from "../utils/mockedTracksData";
import { wait } from "@testing-library/react";
import Tracks from "../Tracks/Tracks";

test("Tracks component successfully fetches and renders", async () => {
  const { container, getAllByAltText } = renderWithRouterAndRedux(
    <FetchMock
      mocks={[
        {
          matcher: "https://api.spotify.com/v1/playlists/undefined",
          method: "GET",
          response: mockedPlaylistDetailsData
        },
        {
          matcher:
            "https://api.spotify.com/v1/users/test/playlists/undefined/tracks",
          method: "GET",
          response: mockedTracksData
        },
        {
          matcher: "https://api.spotify.com/v1/me",
          method: "GET",
          response: {
            country: "TR",
            display_name: "test",
            email: "test@gmail.com",
            explicit_content: {
              filter_enabled: false,
              filter_locked: false
            },
            external_urls: {
              spotify: "https://open.spotify.com/user/test"
            },
            followers: {
              href: null,
              total: 1
            },
            href: "https://api.spotify.com/v1/users/test",
            id: "test",
            images: [],
            product: "open",
            type: "user",
            uri: "spotify:user:test"
          }
        }
      ]}
    >
      <Tracks />
    </FetchMock>
  );

  await wait(() => {
    let cover = getAllByAltText("Cover");
    expect(
      container.querySelector(".playlist-right")?.childElementCount
    ).toEqual(10);
    expect(cover).toHaveLength(1);
  });
});
