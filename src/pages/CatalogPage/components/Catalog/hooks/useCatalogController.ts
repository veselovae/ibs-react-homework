import { useFetchCatalogItems } from "./useFetchCatalogItems";
import { useMemo } from "react";

export const useCatalogController = (searchParam: string) => {
  const { isLoading, isError, data } = useFetchCatalogItems();

  const catalog = Object.values(data);

  const filterCatalogItems = useMemo(() => {
    const param = searchParam?.toLowerCase() || "";

    return catalog.filter(({ name }) => name.toLowerCase().includes(param));
  }, [catalog, searchParam]);

  return { isLoading, isError, filterCatalogItems };
};
