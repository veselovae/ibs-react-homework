import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";

import { reducer } from "./reducer/reducer";

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
