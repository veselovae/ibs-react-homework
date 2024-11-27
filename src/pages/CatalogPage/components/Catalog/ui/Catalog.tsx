import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setCatalogItemsAction } from "@src/store/actions/actionCreators";
import { IState } from "@src/store/model/interfaces";

import { useFetchCatalogItems } from "../hooks/useFetchCatalogItems";

import { CatalogItem } from "../../CatalogItem/CatalogItem";
import { Error } from "@src/components/Error";
import { Loader } from "@src/components/Loader";

import "./Catalog.css";

export const Catalog = () => {
  const catalogItems = useSelector((state: IState) => state.catalogItems);
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const paramStr = useMemo(() => {
    return searchParams.get("search");
  }, [searchParams]);

  const { isError, isLoading, data } = useFetchCatalogItems();

  useEffect(() => {
    dispatch(setCatalogItemsAction(data));
  }, [dispatch, data]);

  const filterCatalogItems = useMemo(() => {
    const param = paramStr?.toLowerCase() || "";

    return catalogItems.filter(({ name }) =>
      name.toLowerCase().includes(param as string),
    );
  }, [catalogItems, paramStr]);

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
