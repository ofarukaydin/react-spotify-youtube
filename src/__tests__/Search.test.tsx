import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { renderWithRouterAndRedux } from "../utils/withRouterAndRedux";
import { wait, fireEvent, waitForElement } from "@testing-library/react";
import Search from "../Search/Search";

test("Search component successfully fetches and renders", async () => {
  const { getByTestId, getByText } = renderWithRouterAndRedux(<Search />);

  let searchBar = getByTestId("searchinput");
  expect(searchBar).toBeDefined();
  expect(getByText("Tracks")).toBeDefined();
  expect(getByText("Artists")).toBeDefined();
  expect(getByText("Albums")).toBeDefined();
  expect(getByText("Playlists")).toBeDefined();

  fireEvent.change(searchBar, { target: { value: "test" } });

  const searchBarText = await waitForElement(() => searchBar);
  expect(searchBarText).toHaveValue("test");

  await wait(() => {});
});
