import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { FetchMock } from "@react-mock/fetch";
import { renderWithRouterAndRedux } from "../utils/withRouterAndRedux";
import { mockedPlaylistsData } from "../utils/mockedPlaylistsData";
import { wait } from "@testing-library/react";
import Sidenav from "../Sidenav/Sidenav";

test("Sidenav component successfully fetches and renders", async () => {
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
      <Sidenav />
    </FetchMock>
  );

  await wait(() => {
    expect(container.querySelectorAll("ul")[0]?.childElementCount).toEqual(3); // Browse, Search, Library
    expect(container.querySelectorAll("ul")[1]?.childElementCount).toEqual(20); // Playlists list
  });
});
