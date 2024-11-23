import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { routes } from "../../routes.const";
import { getCatalogItem, getItemPhoto } from "../../utils/api";
import { IProductItem } from "../../store/model/interfaces";

import { FavoriteActiveIcon } from "../icons/FavoriteActiveIcon";
import { FavoriteNotActiveIcon } from "../icons/FavoriteNotActiveIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { MinusIcon } from "../icons/MinusIcon";
import { Loader } from "../Loader/Loader";
import { Error } from "../Error/Error";

import "./ProductCard.css";

const INITIAL_QUANTITY = 1;

export const ProductCard: FunctionComponent = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(true);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [itemQuantity, setItemQuantity] = useState<number | "">(
    INITIAL_QUANTITY,
  );
  const [productItem, setProductItem] = useState<null | IProductItem>(null);

  const fetchCatalogItem = async () => {
    return await getCatalogItem(productId as string);
  };

  const fetchPhotoItems = async (item: IProductItem) => {
    const itemImg = await getItemPhoto(item.picture.path);

    setProductItem({
      ...item,
      picture: {
        ...item.picture,
        img: itemImg,
      },
    });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchCatalogItem()
      .then((res) => fetchPhotoItems(res))
      .catch((err) => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const handleChangeIcon = () => setIsFavorite(!isFavorite);

  const increaseProductQuantity = () =>
    setItemQuantity(Number(itemQuantity) + 1);

  const decreaseProductQuantity = () => {
    if (itemQuantity > 1) {
      setItemQuantity(Number(itemQuantity) - 1);
    }
  };

  const handleCloseProductCard = () => {
    navigate(routes.default);
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
      {isLoading && <Loader />}
      {error && <Error />}

      {!isLoading && !error && (
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
              src={productItem?.picture?.img}
            />
          </div>
          <div className="product-info">
            <h4 className="product-name">{productItem?.name}</h4>
            <p className="product-description">{productItem?.description}</p>
            <h5 className="product-details-title">Details</h5>
            <p className="product-details-description">
              {productItem?.details}
            </p>
            <div className="product-feat-box">
              <span className="product-price">${productItem?.price.value}</span>
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
