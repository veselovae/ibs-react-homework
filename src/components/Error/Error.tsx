import "./Error.css";
import ErrorIcon from "../icons/ErrorIcon";

const Error = () => {
  return (
    <div className="error-wrapper">
      <div className="error-icon-wrapper">
        <ErrorIcon />
      </div>
      <div className="error-info">Ошибка при загрузке данных</div>
    </div>
  );
};
export default Error;
