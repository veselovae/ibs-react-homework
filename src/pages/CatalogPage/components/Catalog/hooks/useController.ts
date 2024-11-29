import { useFetchCatalogItems } from "./useFetchCatalogItems";
import { useMemo } from "react";

export const useController = (searchParam: string) => {
  const { isLoading, isError, data } = useFetchCatalogItems();

  const filterCatalogItems = useMemo(() => {
    const param = searchParam?.toLowerCase() || "";

    return data.filter(({ name }) => name.toLowerCase().includes(param));
  }, [data, searchParam]);

  return { isLoading, isError, filterCatalogItems };
};
