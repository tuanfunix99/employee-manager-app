import { Fragment } from "react";
import { alertType } from '../../interface/type'

const Alert: React.FC<alertType> = ({ children, alert }) => {
  const alertType = `alert ${alert} mx-auto text-center`;
  return (
    <Fragment>
      <div className={alertType} role="alert">
        { children }
      </div>
    </Fragment>
  );
};

export default Alert;
