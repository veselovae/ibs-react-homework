import { FunctionComponent, useEffect, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setCatalogItemsAction } from "../../store/actions/actionCreators";
import { IState, IProductItem } from "../../store/model/interfaces";

import { getCatalogItems, getItemPhoto } from "../../utils/api";

import { CatalogItem } from "../CatalogItem/CatalogItem";
import { Error } from "../Error/Error";
import { Loader } from "../Loader/Loader";

import "./Catalog.css";

export const Catalog: FunctionComponent = () => {
  const catalogItems = useSelector((state: IState) => state.catalogItems);
  const searchParam = useSelector((state: IState) => state.searchParam);

  const dispatch = useDispatch();

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCatalogItems = async () => {
    return await getCatalogItems();
  };

  const fetchPhotoItems = async (data: IProductItem[]) => {
    const arrOfPromises = data.map((item) => getItemPhoto(item.picture.path));
    const images = await Promise.all(arrOfPromises);
    return data.map(
      (item, index): IProductItem => ({
        ...item,
        picture: {
          ...item.picture,
          img: images[index],
        },
      }),
    );
  };

  useEffect(() => {
    setIsLoading(true);
    fetchCatalogItems()
      .then((res) =>
        fetchPhotoItems(res).then((res) =>
          dispatch(setCatalogItemsAction(res)),
        ),
      )
      .catch((err: Error) => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filterCatalogItems = useMemo(() => {
    const param = searchParam.toLowerCase();
    return catalogItems.filter(({ name }) =>
      name.toLowerCase().includes(param),
    );
  }, [catalogItems, searchParam]);

  return (
    <div className="catalog-container">
      {isLoading && !catalogItems.length && <Loader />}
      {error && <Error />}
      <div className="catalog">
        {filterCatalogItems.map((item) => (
          <CatalogItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
