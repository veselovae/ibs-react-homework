import { Outlet } from "react-router-dom";
import { Header } from "./Header/Header";
import { FunctionComponent } from "react";

export const MainPage: FunctionComponent = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
