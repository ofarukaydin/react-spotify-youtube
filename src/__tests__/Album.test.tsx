import React from "react";
import Album from "../Album/Album";
import "@testing-library/jest-dom/extend-expect";
import { FetchMock } from "@react-mock/fetch";
import { renderWithRouterAndRedux } from "../utils/withRouterAndRedux";
import { mockedAlbumData } from "../utils/mockedAlbumData";
import { wait } from "@testing-library/react";

test("Album component successfully fetches and renders", async () => {
  const { container, getAllByAltText } = renderWithRouterAndRedux(
    <FetchMock
      mocks={[
        {
          matcher: "https://api.spotify.com/v1/albums/undefined",
          method: "GET",
          response: mockedAlbumData
        }
      ]}
    >
      <Album />
    </FetchMock>
  );

  await wait(() => {
    let cover = getAllByAltText("Cover");
    expect(
      container.querySelector(".playlist-right")?.childElementCount
    ).toEqual(6);
    expect(cover).toHaveLength(1);
  });
});
