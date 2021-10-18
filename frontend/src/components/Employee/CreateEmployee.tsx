import { useState, useEffect } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import allActions from "../../actions/allActions";
import { employeeType } from "../../interface/type";
import { useHistory } from "react-router-dom";
import { validator } from "../../utils/validator";

import Alert from "../UI/Alert";

interface validType {
  errors: string[];
  check: boolean;
}

enum buttonType {
  button = "button",
  submit = "submit",
  reset = "reset",
}

const CreateEmployee = () => {
  const { loadingEvent, error } = useAppSelector((state) => state.employee);
  const dispatch = useAppDispatch();

  const [employee, setEmployee] = useState<employeeType>({
    firstName: "",
    lastName: "",
    emailId: "",
  });

  const validTemp: validType = {
    errors: [],
    check: false,
  };

  const [firstNameValid, setFirstNameValid] = useState<validType>(validTemp);
  const [lastNameValid, setLastNameValid] = useState<validType>(validTemp);
  const [emailIdValid, setEmailIdValid] = useState<validType>(validTemp);
  const [isFormValid, setFormValid] = useState(false);

  const history = useHistory();

  //check form is valid
  useEffect(() => {
    if (firstNameValid.check && lastNameValid.check && emailIdValid.check) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
    dispatch(allActions.employeeAcs.resetEmployee());
  }, [firstNameValid, lastNameValid, emailIdValid, dispatch]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployee((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  };

  const onKeyUpHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "firstName":
        setFirstNameValid(
          new validator(employee.firstName).isEmpty().min(2).test()
        );
        break;
      case "lastName":
        setLastNameValid(
          new validator(employee.lastName).isEmpty().min(2).test()
        );
        break;
      case "emailId":
        setEmailIdValid(
          new validator(employee.emailId).isEmpty().isEmail().test()
        );
        break;
    }
  };

  const onSaveHandler = () => {
    dispatch(allActions.employeeAcs.createEmployee(employee, history));
  };

  const onCancleHandler = () => {
    history.push("/");
  };

  return (
    <section className="mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <h2>Create new employee</h2>
            {error &&
              error.map((e, k) => {
                return (
                  <Alert alert="alert-danger" key={k}>
                    {e}
                  </Alert>
                );
              })}
            <form>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                label="First Name"
                className={
                  firstNameValid.errors.length > 0
                    ? "form-control my-2 is-invalid"
                    : "form-control my-2"
                }
                required={true}
                onChange={onChangeHandler}
                onKeyUp={onKeyUpHandler}
              />
              {firstNameValid.errors.length > 0 &&
                firstNameValid.errors.map((err, key) => {
                  return (
                    <p className="my-0 text-danger" key={key}>
                      {err}
                    </p>
                  );
                })}
              <Input
                type="text"
                name="lastName"
                id="lastName"
                label="Last Name"
                className={
                  lastNameValid.errors.length > 0
                    ? "form-control my-2 is-invalid"
                    : "form-control my-2"
                }
                required={true}
                onChange={onChangeHandler}
                onKeyUp={onKeyUpHandler}
              />
              {lastNameValid.errors.length > 0 &&
                lastNameValid.errors.map((err, key) => {
                  return (
                    <p className="my-0 text-danger" key={key}>
                      {err}
                    </p>
                  );
                })}
              <Input
                type="text"
                name="emailId"
                id="emailId"
                label="Email"
                className={
                  emailIdValid.errors.length > 0
                    ? "form-control my-2 is-invalid"
                    : "form-control my-2"
                }
                required={true}
                onChange={onChangeHandler}
                onKeyUp={onKeyUpHandler}
              />
              {emailIdValid.errors.length > 0 &&
                emailIdValid.errors.map((err, key) => {
                  return (
                    <p className="my-0 text-danger" key={key}>
                      {err}
                    </p>
                  );
                })}
              <Button
                type={buttonType.button}
                className="btn btn-success"
                loading={loadingEvent}
                onClick={onSaveHandler}
                disabled={!isFormValid}
              >
                Save
              </Button>
              <Button
                type={buttonType.button}
                className="btn btn-danger"
                onClick={onCancleHandler}
              >
                Cancle
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateEmployee;
