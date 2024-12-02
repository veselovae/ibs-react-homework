import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setCatalogItemsAction } from "@src/store/actions/actionCreators";

import { getCatalogItems } from "@src/utils/api";
import { fetchPhotoItems } from "../lib/fetchPhotoItems";
import { catalogType, IState } from "@src/store/model/interfaces";

export const useFetchCatalogItems = () => {
  const catalogItems = useSelector((state: IState) => state.catalogItems);
  const dispatch = useDispatch();

  const [data, setData] = useState<catalogType>({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(catalogItems).length) {
      setData(catalogItems);
      setIsError(false);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      getCatalogItems()
        .then((res) => fetchPhotoItems(res))
        .then((res) => {
          const obj = res.reduce((acc, el) => {
            return {
              ...acc,
              [el.id]: el,
            };
          }, {});
          setData(obj);
          setIsError(false);
          dispatch(setCatalogItemsAction(obj));
        })
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }
  }, [catalogItems]);

  return { isError, isLoading, data };
};
