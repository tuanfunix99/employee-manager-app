import { Fragment } from "react";
import { employeeType } from "../../interface/type";
import Button from "../UI/Button";
import { Link } from 'react-router-dom'

interface propsType {
  employees: employeeType[];
  onDelete: (id: number | undefined) => void;
}

enum buttonType {
  button = "button",
  submit = "submit",
  reset = "reset",
}

const EmployeeDetail: React.FC<propsType> = ({ employees, onDelete }) => {
  const displayListEmployees = () => {
    if (employees.length > 0) {
      return employees.map((employee: employeeType, key: number) => {
        const { id, firstName, lastName, emailId } = employee;
        return (
          <tr key={key}>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{emailId}</td>
            <td>
              <Button type={buttonType.button} className="btn btn-warning">
              <Link to={`/update/${id}`}>Update</Link>
              </Button>
              <Button
                onClick={() => onDelete(id)}
                type={buttonType.button}
                className="btn btn-danger"
              >
                Delete
              </Button>
            </td>
          </tr>
        );
      });
    }
  };

  return (
    <Fragment>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">Employee Firstname</th>
            <th scope="col">Employee Lastname</th>
            <th scope="col">Employee Emailid</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>{displayListEmployees()}</tbody>
      </table>
    </Fragment>
  );
};

export default EmployeeDetail;
