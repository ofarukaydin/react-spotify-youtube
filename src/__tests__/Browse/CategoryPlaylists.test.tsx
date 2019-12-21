import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { FetchMock } from "@react-mock/fetch";
import { renderWithRouterAndRedux } from "../../utils/withRouterAndRedux";
import { mockedCategoryPlaylists } from "../../utils/mockedCategoryPlaylistsData";
import { wait } from "@testing-library/react";
import CategoryPlaylists from "../../Browse/CategoryPlaylist";

test("CategoryPlaylists component successfully fetches and renders", async () => {
  const { container } = renderWithRouterAndRedux(
    <FetchMock
      mocks={[
        {
          matcher:
            "https://api.spotify.com/v1/browse/categories/undefined/playlists",
          method: "GET",
          response: mockedCategoryPlaylists
        }
      ]}
    >
      <CategoryPlaylists />
    </FetchMock>
  );

  await wait(() => {
    expect(
      container.querySelector(".card-grid-container")?.childElementCount
    ).toEqual(15);
  });
});
