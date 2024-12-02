import { catalogType } from "../model/interfaces";
import { actionTypes } from "./actionTypes";

export const setCatalogItemsAction = (payload: catalogType) => ({
  type: actionTypes.setCatalogItems,
  payload,
});
