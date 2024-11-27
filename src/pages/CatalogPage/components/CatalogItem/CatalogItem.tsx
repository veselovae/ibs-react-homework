import { MouseEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { IProductItem } from "@src/store/model/interfaces";

import { FavoriteNotActiveIcon } from "@icons/FavoriteNotActiveIcon";
import { FavoriteActiveIcon } from "@icons/FavoriteActiveIcon";

import "./CatalogItem.css";

export const CatalogItem = ({ item }: { item: IProductItem }) => {
  const [itemLike, setItemLike] = useState(item?.like);

  const toggleItemLike = (e: MouseEvent) => {
    e.stopPropagation();
    setItemLike(!itemLike);
  };
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = () => {
    pathname.includes("catalog")
      ? navigate(`${item.id}`)
      : navigate(`catalog/${item.id}`);
  };

  return (
    <div className="catalog-item" onClick={handleClick}>
      <button className="favorite-btn" onClick={(e) => toggleItemLike(e)}>
        {itemLike ? <FavoriteActiveIcon /> : <FavoriteNotActiveIcon />}
      </button>

      <div className="photo-wrapper">
        <img src={item?.picture?.img} className="item-photo" alt={item?.name} />
      </div>
      <div className="item-name-wrapper">
        <h5 className="item-name">{item?.name}</h5>
      </div>
      <span className="item-price">${item.price?.value}</span>
    </div>
  );
};