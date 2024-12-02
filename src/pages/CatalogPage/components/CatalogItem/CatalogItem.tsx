import { MouseEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";

import { IProductItem } from "@src/store/model/interfaces";

import { FavoriteNotActiveIcon } from "@icons/FavoriteNotActiveIcon";
import { FavoriteActiveIcon } from "@icons/FavoriteActiveIcon";

import "./CatalogItem.css";

interface ICatalogItemProps {
  item: IProductItem;
}

export const CatalogItem = ({ item }: ICatalogItemProps) => {
  const [itemLike, setItemLike] = useState<boolean | undefined>(item?.like);

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
    <Card className="catalog-item" onClick={handleClick}>
      <IconButton
        aria-label="add to favorites"
        className="favorite-btn"
        onClick={handleToggleItemLike}
      >
        {itemLike ? <FavoriteActiveIcon /> : <FavoriteNotActiveIcon />}
      </IconButton>

      <div className="photo-wrapper">
        <CardMedia
          component="img"
          image={item?.picture?.img}
          className="item-photo"
          alt={item?.name}
        />
      </div>
      <CardContent className="item-content">
        <Typography variant="h5" className="item-name" gutterBottom>
          {item?.name}
        </Typography>
        <Typography variant="price" className="item-price">
          ${item.price?.value}
        </Typography>
      </CardContent>
    </Card>
  );
};
