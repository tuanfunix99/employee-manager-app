import { useEffect } from "react";
import EmployeeDetail from "./EmployeeDetail";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import allActions from "../../actions/allActions";

import Alert from "../UI/Alert";
import Spinner from "../UI/Spinner";

const ListEmployee: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error, employees } = useAppSelector(
    (state) => state.employee
  );

  useEffect(() => {
    dispatch(allActions.employeeAcs.loadEmployees());
  }, [dispatch]);

  const onDeleteEmployeeHandler = (id: number | undefined) => {
    console.log(id)
    if (id) {
      dispatch(allActions.employeeAcs.deleteEmployee(id));
    }
  };
  
  return (
    <section className="mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="text-center">List Employees</h2>
            {error &&
              error.map((e, k) => {
                return (
                  <Alert alert="alert-danger" key={k}>
                    {e}
                  </Alert>
                );
              })}
            {employees && (
              <EmployeeDetail
                employees={employees}
                onDelete={onDeleteEmployeeHandler}
              />
            )}
            {loading && <Spinner />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListEmployee;
