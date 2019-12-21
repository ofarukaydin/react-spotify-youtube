import { Provider } from "react-redux";
import { store as reduxStore } from "../store/store";
import { render } from "@testing-library/react";
import React from "react";

export function renderWithRedux(ui, store = reduxStore) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store
  };
}
