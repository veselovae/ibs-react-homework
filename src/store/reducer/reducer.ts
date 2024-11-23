import { IProductItem, IState } from "../model/interfaces";

const defaultState: IState = {
  searchParam: "",
  catalogItems: [],
};

export const reducer = (state = defaultState, action: any) => {
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
