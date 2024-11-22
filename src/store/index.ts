import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";

import { IProductItem, IState } from "./modal/interfaces";

const defaultState: IState = {
  searchParam: "",
  catalogItems: [],
};

const reducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case "SET_CATALOG_ITEMS":
      return {
        ...state,
        catalogItems: [...(action.payload as IProductItem[])],
      };

    case "CHANGE_SEARCH_PARAM":
      return {
        ...state,
        searchParam: action.payload as string,
      };
    default:
      return state;
  }
};

export const setCatalogItemsAction = (payload: IProductItem[]) => ({
  type: "SET_CATALOG_ITEMS",
  payload,
});
export const changeSearchParamAction = (payload: string) => ({
  type: "CHANGE_SEARCH_PARAM",
  payload,
});

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
