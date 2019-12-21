import { configureStore, Action } from "@reduxjs/toolkit";
import rootReducer, { RootState } from "./reducers/rootReducer";
import { ThunkAction } from "redux-thunk";

export const store = configureStore({
  reducer: rootReducer
});

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./reducers/rootReducer", () => {
    const newRootReducer = require("./reducers/rootReducer").default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export default store;
