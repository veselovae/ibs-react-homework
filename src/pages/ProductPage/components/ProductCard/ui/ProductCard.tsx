import { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useFetchProduct } from "../hooks/useFetchProduct";

import { FavoriteActiveIcon } from "@icons/FavoriteActiveIcon";
import { FavoriteNotActiveIcon } from "@icons/FavoriteNotActiveIcon";
import { PlusIcon } from "@icons/PlusIcon";
import { MinusIcon } from "@icons/MinusIcon";
import { Loader } from "@src/components/Loader";
import { Error } from "@src/components/Error";

import "./ProductCard.css";

const INITIAL_QUANTITY = 1;

export const ProductCard = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(true);
  const [itemQuantity, setItemQuantity] = useState<number | "">(
    INITIAL_QUANTITY,
  );

  const { isError, isLoading, product } = useFetchProduct(productId as string);

  const handleChangeIcon = () => setIsFavorite(!isFavorite);

  const increaseProductQuantity = () =>
    setItemQuantity(Number(itemQuantity) + 1);

  const decreaseProductQuantity = () => {
    if (itemQuantity > 1) {
      setItemQuantity(Number(itemQuantity) - 1);
    }
  };

  const handleCloseProductCard = () => {
    navigate(-1);
  };

  const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setItemQuantity("");
    } else {
      setItemQuantity(Number(e.target.value));
    }
  };

  const handleCheckInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 1 || e.target.value === "") {
      setItemQuantity(INITIAL_QUANTITY);
    }
  };

  return (
    <div className="product-card-container">
      {isLoading && !isError && <Loader />}
      {isError && <Error />}

      {!isLoading && !isError && (
        <div className="product-сard">
          <button
            className="back-to-catalog-btn"
            onClick={handleCloseProductCard}
          >
            <PlusIcon />
          </button>
          <div className="product-img-wrapper">
            <img
              alt="product-photo"
              className="product-img"
              src={product?.picture?.img}
            />
          </div>
          <div className="product-info">
            <h4 className="product-name">{product?.name}</h4>
            <p className="product-description">{product?.description}</p>
            <h5 className="product-details-title">Details</h5>
            <p className="product-details-description">{product?.details}</p>
            <div className="product-feat-box">
              <span className="product-price">${product?.price.value}</span>
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
                  onChange={handleChangeQuantity}
                  onBlur={handleCheckInputValue}
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
                {isFavorite ? (
                  <FavoriteActiveIcon />
                ) : (
                  <FavoriteNotActiveIcon />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
