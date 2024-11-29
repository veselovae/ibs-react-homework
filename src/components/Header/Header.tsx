import { useParams } from "react-router-dom";

import { Search } from "./components/Search";
import { CartIcon } from "@icons/CartIcon";
import { UserIcon } from "@icons/UserIcon";

import "./Header.css";

export const Header = () => {
  const { productId } = useParams();

  return (
    <header>
      {!productId && <Search />}

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
