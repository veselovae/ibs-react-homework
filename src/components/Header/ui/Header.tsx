import { useLocation } from "react-router-dom";

import { Search } from "../components/Search";
import { CartIcon } from "@icons/CartIcon";
import { UserIcon } from "@icons/UserIcon";

import "./Header.css";

export const Header = () => {
  const { pathname } = useLocation();
  const isCatalogPage = pathname === "/" || pathname === "/catalog";

  return (
    <header>
      {isCatalogPage && <Search />}

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
