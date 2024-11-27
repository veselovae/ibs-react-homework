import { IProductItem, IState } from "../model/interfaces";

const defaultState: IState = {
  catalogItems: [],
};

export const reducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case "SET_CATALOG_ITEMS":
      return {
        ...state,
        catalogItems: [...(action.payload as IProductItem[])],
      };

    default:
      return state;
  }
};
