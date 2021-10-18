import { useState, useEffect } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import allActions from "../../actions/allActions";
import { employeeType } from "../../interface/type";
import { useHistory, useParams } from "react-router-dom";
import { validator } from "../../utils/validator";

import Alert from "../UI/Alert";

interface validType {
  errors: string[];
  check: boolean;
}

interface paramsType {
  id: string;
}

enum buttonType {
  button = "button",
  submit = "submit",
  reset = "reset",
}

const UpdateEmployee: React.FC = () => {
  const { loadingEvent, error, employee } = useAppSelector(
    (state) => state.employee
  );

  const dispatch = useAppDispatch();

  const [empl, setEmpl] = useState<employeeType>({
    firstName: "",
    lastName: "",
    emailId: "",
  });

  const [isEmpl, setIsEmpl] = useState<boolean>(false);

  const validTemp: validType = {
    errors: [],
    check: true,
  };

  const [firstNameValid, setFirstNameValid] = useState<validType>(validTemp);
  const [lastNameValid, setLastNameValid] = useState<validType>(validTemp);
  const [emailIdValid, setEmailIdValid] = useState<validType>(validTemp);
  const [isFormValid, setFormValid] = useState(false);

  const history = useHistory();
  const params: paramsType = useParams();

  useEffect(() => {
    if (firstNameValid.check && lastNameValid.check && emailIdValid.check) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }

    if(!employee){
      dispatch(allActions.employeeAcs.loadEmployee(params.id));
    }

    if(!isEmpl && employee){
      setEmpl(employee)
      setIsEmpl(true);
    }

  },[
    firstNameValid,
    lastNameValid,
    emailIdValid,
    dispatch,
    params.id,
    isEmpl,
    employee
  ]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmpl((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  };

  const onKeyUpHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "firstName":
        setFirstNameValid(
          new validator(empl.firstName).isEmpty().min(2).test()
        );
        break;
      case "lastName":
        setLastNameValid(
          new validator(empl.lastName).isEmpty().min(2).test()
        );
        break;
      case "emailId":
        setEmailIdValid(
          new validator(empl.emailId).isEmpty().isEmail().test()
        );
        break;
    }
  };

  const onUpdateHandler = () => {
    console.log('update')
    console.log(empl)
    dispatch(allActions.employeeAcs.updateEmployee(empl, params.id, history));
  };

  const onCancleHandler = () => {
    history.push("/");
  };

  console.log(error);

  return (
    <section className="mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <h2>Update employee</h2>
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
                value={ empl.firstName }
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
                value={ empl.lastName }
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
                value={ empl.emailId }
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
                className="btn btn-info text-light"
                loading={loadingEvent}
                onClick={onUpdateHandler}
                disabled={!isFormValid}
              >
                Update
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

export default UpdateEmployee;
