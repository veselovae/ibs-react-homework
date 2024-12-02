import Img from "@src/assets/404_Error.png";
import "./Error404Page.css";

export const Error404Page = () => {
  return (
    <div className="page-404-wrapper">
      <img alt="Страница не найдена" src={Img} className="page-404-image" />
    </div>
  );
};
