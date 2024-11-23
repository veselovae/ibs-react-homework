import { FunctionComponent } from "react";
import { LoaderIcon } from "../icons/LoaderIcon";
import "./Loader.css";

export const Loader: FunctionComponent = () => {
  return (
    <div className="loader-wrapper">
      <LoaderIcon />
    </div>
  );
};
