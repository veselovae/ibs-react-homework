import { useEffect, useState } from "react";
import { getCatalogItem } from "@src/utils/api";
import { fetchItemPhoto } from "../lib/fetchItemPhoto";
import { IProductItem, IState } from "@src/store/model/interfaces";
import { useSelector } from "react-redux";
import { processResponse } from "@src/utils/utils";

export const useFetchProduct = (productId: string) => {
  const catalogItems = useSelector((state: IState) => state.catalogItems);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<null | IProductItem>(null);

  useEffect(() => {
    if (Object.keys(catalogItems).length) {
      setIsError(false);
      setIsLoading(false);
      setProduct(catalogItems[productId]);
    } else {
      setIsLoading(true);
      getCatalogItem(productId)
        .then((res: IProductItem): Promise<IProductItem> => fetchItemPhoto(res))
        .then((res: IProductItem): IProductItem => processResponse(res))
        .then((res: IProductItem): void => {
          setProduct(res);
          setIsError(false);
        })
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }
  }, [catalogItems, productId]);

  return { isError, isLoading, product };
};
