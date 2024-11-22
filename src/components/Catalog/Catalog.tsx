import "./Catalog.css";
import CatalogItem from "../CatalogItem/CatalogItem";
import { useEffect, useMemo } from "react";
import { getCatalogItems, getItemPhoto } from "../../functions/api";
import { filterCatalogItems } from "../../functions/utils";
import { useDispatch, useSelector } from "react-redux";
import { setCatalogItemsAction } from "../../store";

function Catalog() {
  const catalogItems = useSelector((state) => state.catalogItems);
  const searchParam = useSelector((state) => state.searchParam);
  const dispatch = useDispatch();

  const fetchCatalogItems = async () => {
    return await getCatalogItems();
  };

  const fetchPhotoItems = async (data) => {
    const arrOfPromises = data.map((item) => getItemPhoto(item.picture.path));
    const images = await Promise.all(arrOfPromises);
    return data.map((item, index) => ({
      ...item,
      picture: {
        ...item.picture,
        img: images[index],
      },
    }));
  };

  useEffect(() => {
    fetchCatalogItems().then((res) =>
      fetchPhotoItems(res).then((res) => dispatch(setCatalogItemsAction(res))),
    );
  }, []);

  const filterCatalogItems = useMemo(() => {
    const param = searchParam.toLowerCase();
    return catalogItems.filter(({ name }) =>
      name.toLowerCase().includes(param),
    );
  }, [catalogItems, searchParam]);

  return (
    <div className="catalog-container">
      <div className="catalog">
        {filterCatalogItems.map((item) => (
          <CatalogItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Catalog;
