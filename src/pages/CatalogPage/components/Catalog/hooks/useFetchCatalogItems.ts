import { useEffect, useState } from "react";
import { getCatalogItems } from "@src/utils/api";
import { fetchPhotoItems } from "../lib/fetchPhotoItems";
import { IProductItem } from "@src/store/model/interfaces";

export const useFetchCatalogItems = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IProductItem[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getCatalogItems()
      .then((res) => fetchPhotoItems(res))
      .then((res) => {
        setData(res);
        setIsError(false);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return { isError, isLoading, data };
};
