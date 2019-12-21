import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { FetchMock } from "@react-mock/fetch";
import { renderWithRouterAndRedux } from "../../utils/withRouterAndRedux";
import { mockedPlaylistsData } from "../../utils/mockedPlaylistsData";
import { wait } from "@testing-library/react";
import Playlists from "../../Library/Playlists";

test("Playlists component successfully fetches and renders", async () => {
  const { container } = renderWithRouterAndRedux(
    <FetchMock
      mocks={[
        {
          matcher: "https://api.spotify.com/v1/users/test/playlists",
          method: "GET",
          response: mockedPlaylistsData
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
      <Playlists />
    </FetchMock>
  );

  await wait(() => {
    expect(
      container.querySelector(".card-grid-container").childElementCount
    ).toEqual(20);
  });
});
