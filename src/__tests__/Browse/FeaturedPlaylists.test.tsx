import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { FetchMock } from "@react-mock/fetch";
import { renderWithRouterAndRedux } from "../../utils/withRouterAndRedux";
import { mockedFeaturedPlaylistsData } from "../../utils/mockedFeaturedPlaylistsData";
import { wait } from "@testing-library/react";
import FeaturedPlaylists from "../../Browse/FeaturedPlaylists";

test("FeaturedPlaylists component successfully fetches and renders", async () => {
  const { container } = renderWithRouterAndRedux(
    <FetchMock
      mocks={[
        {
          matcher: "https://api.spotify.com/v1/browse/featured-playlists",
          method: "GET",
          response: mockedFeaturedPlaylistsData
        }
      ]}
    >
      <FeaturedPlaylists />
    </FetchMock>
  );

  await wait(() => {
    expect(
      container.querySelector(".card-grid-container")?.childElementCount
    ).toEqual(15);
  });
});
