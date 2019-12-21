import React, { ReactNode } from "react";
import "@testing-library/jest-dom/extend-expect";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store as reduxStore } from "../store/store";
import sinon from "sinon";

export function renderWithRouterAndRedux(
  ui: JSX.Element,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  }: {
    route?: string;
    history?: any;
  } = {}
) {
  sinon.stub(window.location, "assign");
  sinon.stub(window.location, "replace");
  const Wrapper = ({ children }: { children?: ReactNode }) => (
    <Provider store={reduxStore}>
      <Router history={history}>{children}</Router>
    </Provider>
  );
  return {
    ...render(ui, { wrapper: Wrapper }),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history
  };
}
