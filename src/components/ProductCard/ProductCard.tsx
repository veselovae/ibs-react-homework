import "./ProductCard.css";

import FavoriteActiveIcon from "../icons/FavoriteActiveIcon";
import FavoriteNotActiveIcon from "../icons/FavoriteActiveIcon";
import { useEffect, useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import MinusIcon from "../icons/MinusIcon";
import { getCatalogItem, getItemPhoto } from "../../functions/api";
import { useNavigate, useParams } from "react-router-dom";

const ProductCard = () => {
  const [itemLike, setItemLike] = useState(true);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [ProductItem, setProductItem] = useState(null);

  const { productId } = useParams();

  const fetchCatalogItem = async () => {
    return await getCatalogItem(productId);
  };

  const fetchPhotoItems = async (data) => {
    const itemImg = await getItemPhoto(data.picture.path);

    setProductItem({
      ...data,
      picture: {
        ...data.picture,
        img: itemImg,
      },
    });
  };

  useEffect(() => {
    fetchCatalogItem().then((res) => fetchPhotoItems(res));
  }, []);

  const handleChangeIcon = () => {
    setItemLike(!itemLike);
  };

  const increaseProductQuantity = () => {
    setItemQuantity(itemQuantity + 1);
  };

  const decreaseProductQuantity = () => {
    if (itemQuantity > 1) {
      setItemQuantity(itemQuantity - 1);
    }
  };

  const navigate = useNavigate();

  const handleCloseProductCard = () => {
    navigate(`/`);
  };

  useEffect(() => {
    if (itemQuantity < 1) {
      setItemQuantity(1);
    }
  }, [itemQuantity]);

  return (
    <div className="detailed-page-container">
      <div className="product-сard">
        <div className="back-to-catalog-btn" onClick={handleCloseProductCard}>
          <PlusIcon />
        </div>
        <div className="product-img-wrapper">
          <img
            alt="product-photo"
            className="product-img"
            src={ProductItem?.picture?.img}
          />
        </div>
        <div className="product-info">
          <h4 className="product-name">{ProductItem?.name}</h4>
          <p className="product-description">{ProductItem?.description}</p>
          <h5 className="product-details-title">Details</h5>
          <p className="product-details-description">{ProductItem?.details}</p>
          <div className="product-feat-box">
            <span className="product-price">${ProductItem?.price.value}</span>
            <div className="product-quantity-box">
              <button
                className="quantity-btn reduce-btn"
                onClick={decreaseProductQuantity}
              >
                <MinusIcon />
              </button>
              <input
                type="number"
                className="product-quantity"
                value={itemQuantity}
                onChange={(e) => {
                  setItemQuantity(+e.target.value);
                }}
              />
              <button
                className="quantity-btn increase-btn"
                onClick={increaseProductQuantity}
              >
                <PlusIcon />
              </button>
            </div>
            <button className="add-to-cart">Add to cart</button>
            <button className="card-favorite-btn" onClick={handleChangeIcon}>
              {itemLike ? <FavoriteActiveIcon /> : <FavoriteNotActiveIcon />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
