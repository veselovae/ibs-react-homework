import { IProductItem } from "../model/interfaces";
import { actionTypes } from "./actionTypes";

export const setCatalogItemsAction = (payload: IProductItem[]) => ({
  type: actionTypes.setCatalogItems,
  payload,
});
export const changeSearchParamAction = (payload: string) => ({
  type: actionTypes.changeSearchParam,
  payload,
});
