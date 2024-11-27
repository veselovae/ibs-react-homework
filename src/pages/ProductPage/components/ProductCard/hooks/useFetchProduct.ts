import { useEffect, useState } from "react";
import { getCatalogItem } from "@src/utils/api";
import { fetchItemPhoto } from "../lib/fetchItemPhoto";
import { IProductItem } from "@src/store/model/interfaces";

export const useFetchProduct = (productId: string) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<null | IProductItem>(null);

  useEffect(() => {
    setIsLoading(true);
    getCatalogItem(productId)
      .then((res) => fetchItemPhoto(res))
      .then((res) => {
        setProduct(res);
        setIsError(false);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return { isError, isLoading, product };
};
