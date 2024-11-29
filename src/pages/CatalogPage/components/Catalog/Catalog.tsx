import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { IState } from "@src/store/model/interfaces";

import { useController } from "./hooks/useController";

import { CatalogItem } from "../CatalogItem/CatalogItem";
import { Error } from "@src/components/Error";
import { Loader } from "@src/components/Loader";

import "./Catalog.css";

export const Catalog = () => {
  const catalogItems = useSelector((state: IState) => state.catalogItems);

  const [searchParams] = useSearchParams();
  const paramStr = useMemo(() => {
    return searchParams.get("search");
  }, [searchParams]);

  const { isError, isLoading, filterCatalogItems } = useController(
    paramStr as string,
  );

  return (
    <div className="catalog-container">
      {isLoading && !isError && !catalogItems.length && <Loader />}
      {isError && <Error />}
      {!filterCatalogItems.length && !isError && !isLoading && (
        <div className="no-products-found">Товары не найдены</div>
      )}
      <div className="catalog">
        {filterCatalogItems.map((item) => (
          <CatalogItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
