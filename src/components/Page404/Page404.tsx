import Img from "../../assets/404_Error.png";
import "./Page404.css";

export const Page404 = () => {
  return (
    <div className="page-404-wrapper">
      <div className="page-404-image-wrapper">
        <img alt="Страница не найдена" src={Img} className="page-404-image" />
      </div>
    </div>
  );
};
