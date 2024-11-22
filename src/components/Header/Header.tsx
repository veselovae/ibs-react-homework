import "./Header.css";
import SearchIcon from "../icons/SearchIcon";
import CartIcon from "../icons/CartIcon";
import UserIcon from "../icons/UserIcon";
import { changeSearchParamAction } from "../../store";
import { debounce } from "../../utils/utils";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { ChangeEvent } from "react";

function Header() {
  const dispatch = useDispatch();

  const isCatalogPage = useLocation().pathname === "/";

  const debouncedChange = debounce((inputValue: string) => {
    dispatch(changeSearchParamAction(inputValue));
  }, 600);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    debouncedChange(inputValue);
  };

  return (
    <header>
      {isCatalogPage && (
        <div className="search-box">
          <input
            type="text"
            placeholder="Search products"
            className="search-input"
            onChange={handleChange}
          />
          <SearchIcon />
        </div>
      )}

      <div className="features-box">
        <button className="feature-btn">
          <CartIcon />
        </button>
        <button className="feature-btn">
          <UserIcon />
        </button>
      </div>
    </header>
  );
}

export default Header;
