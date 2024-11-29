import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { setCatalogItemsAction } from "@src/store/actions/actionCreators";

import { getCatalogItems } from "@src/utils/api";
import { fetchPhotoItems } from "../lib/fetchPhotoItems";
import { IProductItem } from "@srcstore/model/interfaces";

export const useFetchCatalogItems = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState<IProductItem[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCatalogItems()
      .then((res) => fetchPhotoItems(res))
      .then((res) => {
        setData(res);
        setIsError(false);
        dispatch(setCatalogItemsAction(res));
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return { isError, isLoading, data };
};
