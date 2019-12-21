import React from "react";
import LikedSongs from "../../Library/LikedSongs";
import "@testing-library/jest-dom/extend-expect";
import { FetchMock } from "@react-mock/fetch";
import { renderWithRouterAndRedux } from "../../utils/withRouterAndRedux";
import { mockedLikedSongsData } from "../../utils/mockedLikedSongsData";
import { wait } from "@testing-library/react";

test("LikedSongs component successfully fetches and renders", async () => {
  const { container, getAllByAltText } = renderWithRouterAndRedux(
    <FetchMock
      mocks={[
        {
          matcher: "https://api.spotify.com/v1/me/tracks",
          method: "GET",
          response: mockedLikedSongsData
        }
      ]}
    >
      <LikedSongs />
    </FetchMock>
  );

  await wait(() => {
    let cover = getAllByAltText("Cover");
    expect(
      container.querySelector(".playlist-right")?.childElementCount
    ).toEqual(20);
    expect(cover).toHaveLength(1);
  });
});
