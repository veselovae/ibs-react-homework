import axios from "axios";
import { IProductItem } from "@src/store/model/interfaces";

const API_URL = "http://localhost:3006";

export const getCatalogItem = async (id: string): Promise<IProductItem> => {
  return await axios
    .get(`${API_URL}/item/${id}`)
    .then(({ data: { content } }) => content);
};

export const getCatalogItems = async (): Promise<IProductItem[]> => {
  return await axios
    .get(`${API_URL}/item`)
    .then(({ data: { content } }) => content);
};

export const getItemPhoto = async (path: string): Promise<string> => {
  const blob = await axios
    .get(`${API_URL}/${path}`, {
      responseType: "blob",
    })
    .then(({ data }): Blob => new Blob([data]));
  return window.URL.createObjectURL(blob);
};
