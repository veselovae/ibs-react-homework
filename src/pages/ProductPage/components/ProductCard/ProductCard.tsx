import { ChangeEvent, KeyboardEvent, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useFetchProduct } from "./hooks/useFetchProduct";

import { FavoriteActiveIcon } from "@icons/FavoriteActiveIcon";
import { FavoriteNotActiveIcon } from "@icons/FavoriteNotActiveIcon";
import { PlusIcon } from "@icons/PlusIcon";
import { MinusIcon } from "@icons/MinusIcon";
import { Loader } from "@src/components/Loader";
import { Error } from "@src/components/Error";

import "./ProductCard.css";

const INITIAL_QUANTITY = 0;

export const ProductCard = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(false);
  const [itemQuantity, setItemQuantity] = useState<number | "">(
    INITIAL_QUANTITY,
  );

  const { isError, isLoading, product } = useFetchProduct(productId as string);

  const handleChangeIcon = useCallback(
    () => setIsFavorite(!isFavorite),
    [isFavorite],
  );

  const handleIncreaseProductQty = useCallback(
    () => setItemQuantity(Number(itemQuantity) + 1),
    [itemQuantity],
  );

  const handleDecreaseProductQty = useCallback(() => {
    if (itemQuantity > 0) {
      setItemQuantity(Number(itemQuantity) - 1);
    }
  }, [itemQuantity]);

  const handleCloseProductCard = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setItemQuantity("");
    } else {
      setItemQuantity(Number(e.target.value));
    }
  };

  const handleCheckInputValue = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    if (value === "") {
      setItemQuantity(INITIAL_QUANTITY);
    }
  };

  const handlePreventNegativeNumber = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "-") {
        e.preventDefault();
      }
    },
    [],
  );

  return (
    <div className="product-card-container">
      {isLoading && !isError && <Loader />}
      {isError && <Error />}

      {!isLoading && !isError && (
        <div className="product-card">
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
                  onClick={handleDecreaseProductQty}
                >
                  <MinusIcon />
                </button>
                <input
                  type="number"
                  className="product-quantity"
                  value={itemQuantity}
                  onKeyDown={handlePreventNegativeNumber}
                  onChange={handleChangeQuantity}
                  onBlur={handleCheckInputValue}
                />
                <button
                  className="quantity-btn increase-btn"
                  onClick={handleIncreaseProductQty}
                >
                  <PlusIcon />
                </button>
              </div>
              <button className="add-to-cart" disabled={!itemQuantity}>
                Add to cart
              </button>
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
