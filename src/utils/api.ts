import { AxiosResponse } from "axios";
import { ApiInstance } from "./ApiInstance";
import { IProductItem } from "@src/store/model/interfaces";
import { IDataCatalogItem, IDataCatalogItems } from "./model/interfaces";

export const getCatalogItem = async (id: string): Promise<IProductItem> => {
  return await ApiInstance.get(`item/${id}`).then(
    ({ data: { content } }: AxiosResponse<IDataCatalogItem>): IProductItem =>
      content,
  );
};

export const getCatalogItems = async (): Promise<IProductItem[]> => {
  return await ApiInstance.get(`item`).then(
    ({ data: { content } }: AxiosResponse<IDataCatalogItems>): IProductItem[] =>
      content,
  );
};

export const getItemPhoto = async (path: string): Promise<string> => {
  const blob = await ApiInstance.get(`${path}`, {
    responseType: "blob",
  }).then(({ data }: AxiosResponse<Blob>): Blob => data);
  return window.URL.createObjectURL(blob);
};
