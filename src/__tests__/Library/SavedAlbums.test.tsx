import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { FetchMock } from "@react-mock/fetch";
import { renderWithRouterAndRedux } from "../../utils/withRouterAndRedux";
import { mockedSavedAlbumsData } from "../../utils/mockedSavedAlbumsData";
import { wait } from "@testing-library/react";
import SavedAlbums from "../../Library/SavedAlbums";

test("SavedAlbums component successfully fetches and renders", async () => {
  const { container } = renderWithRouterAndRedux(
    <FetchMock
      mocks={[
        {
          matcher: "https://api.spotify.com/v1/me/albums",
          method: "GET",
          response: mockedSavedAlbumsData
        }
      ]}
    >
      <SavedAlbums />
    </FetchMock>
  );

  await wait(() => {
    expect(
      container.querySelector(".card-grid-container")?.childElementCount
    ).toEqual(2);
  });
});
