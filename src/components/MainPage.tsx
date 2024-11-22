import Header from "./Header/Header";
import { Outlet } from "react-router-dom";

const MainPage = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default MainPage;
