import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { FetchMock } from "@react-mock/fetch";
import { renderWithRouterAndRedux } from "../../utils/withRouterAndRedux";
import { mockedNewReleasesData } from "../../utils/mockedNewReleasesData";
import { wait } from "@testing-library/react";
import NewReleases from "../../Browse/NewReleases";

test("NewReleases component successfully fetches and renders", async () => {
  const { container } = renderWithRouterAndRedux(
    <FetchMock
      mocks={[
        {
          matcher: "https://api.spotify.com/v1/browse/new-releases",
          method: "GET",
          response: mockedNewReleasesData
        }
      ]}
    >
      <NewReleases />
    </FetchMock>
  );

  await wait(() => {
    expect(
      container.querySelector(".card-grid-container")?.childElementCount
    ).toEqual(20);
  });
});
