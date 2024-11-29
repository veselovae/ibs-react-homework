import { MouseEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IProductItem } from "@src/store/model/interfaces";

import { FavoriteNotActiveIcon } from "@icons/FavoriteNotActiveIcon";
import { FavoriteActiveIcon } from "@icons/FavoriteActiveIcon";

import "./CatalogItem.css";

export const CatalogItem = ({ item }: { item: IProductItem }) => {
  const [itemLike, setItemLike] = useState(item?.like);

  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`../catalog/${item.id}`);
  }, [navigate, item.id]);

  const handleToggleItemLike = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      setItemLike(!itemLike);
    },
    [itemLike],
  );

  return (
    <div className="catalog-item" onClick={handleClick}>
      <button className="favorite-btn" onClick={handleToggleItemLike}>
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
