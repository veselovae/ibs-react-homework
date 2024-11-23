import { FunctionComponent } from "react";
import { ErrorIcon } from "../icons/ErrorIcon";
import "./Error.css";

export const Error: FunctionComponent = () => {
  return (
    <div className="error-wrapper">
      <div className="error-icon-wrapper">
        <ErrorIcon />
      </div>
      <div className="error-info">Ошибка при загрузке данных</div>
    </div>
  );
};
