import { ChangeEvent, FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { changeSearchParamAction } from "../../store/actions/actionCreators";
import { debounce } from "../../utils/utils";

import { SearchIcon } from "../icons/SearchIcon";
import { CartIcon } from "../icons/CartIcon";
import { UserIcon } from "../icons/UserIcon";

import "./Header.css";

const DELAY_MS = 600;

export const Header: FunctionComponent = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isCatalogPage = pathname === "/";

  const debouncedChange = debounce((inputValue: string) => {
    dispatch(changeSearchParamAction(inputValue));
  }, DELAY_MS);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedChange(e.target.value);
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

      <div className="header-features-box">
        <button className="header-feature-btn">
          <CartIcon />
        </button>
        <button className="header-feature-btn">
          <UserIcon />
        </button>
      </div>
    </header>
  );
};
