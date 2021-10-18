
import { Fragment } from 'react'

const Spinner: React.FC = () => {
  return (
    <Fragment>
      <div className="spinner-border text-secondary mx-auto" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </Fragment>
  );
};

export default Spinner;
