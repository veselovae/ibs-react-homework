import { useParams } from "react-router-dom";

import IconButton from "@mui/material/IconButton";

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
        <IconButton className="header-feature-btn">
          <CartIcon />
        </IconButton>
        <IconButton className="header-feature-btn">
          <UserIcon />
        </IconButton>
      </div>
    </header>
  );
};
