import { employeeActions } from "../reducer/employee";
import { AppDispatch } from "../hooks/store";
import {
  loadEmployeesApi,
  deleteEmployeeApi,
  createEmployeeApi,
  loadEmployeeApi,
  updateEmployeeApi
} from "../api/index";
import { employeeType } from "../interface/type";
import {
  handleValidationError,
  handleErrorNotFound,
} from "../utils/handleError";

const resetEmployee = () => (dispatch: AppDispatch) => {
  dispatch(employeeActions.resetEmployee());
};

const loadEmployees = () => async (dispatch: AppDispatch) => {
  dispatch(employeeActions.loadEmployees());
  try {
    const { data } = await loadEmployeesApi();
    dispatch(employeeActions.loadEmployeesSuccess(data));
  } catch (error: any) {
    if (error.response && error.response.data) {
      dispatch(employeeActions.loadEmployeesError(error.response.data.message));
    }
  }
};

const loadEmployee = (id: any) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await loadEmployeeApi(id);
    dispatch(employeeActions.loadEmployeeSuccess(data));
  } catch (error: any) {
    if (error.response && error.response.data) {
      const errors = handleErrorNotFound(error.response.data.message);
      dispatch(employeeActions.deleteEmployeesError(errors));
    }
  }
};

const createEmployee =
  (employee: employeeType, history: any) => async (dispatch: AppDispatch) => {
    dispatch(employeeActions.loadEventEmployees());
    try {
      await createEmployeeApi(employee);
      history.push("/");
      dispatch(employeeActions.createEmployeeSuccess());
    } catch (error: any) {
      if (error.response && error.response.data) {
        const errors = handleValidationError(
          error.response.data.validationErrors
        );
        dispatch(employeeActions.loadEmployeesError(errors));
      }
    }
  };

  const updateEmployee =
  (employee: employeeType, id: any, history: any) => async (dispatch: AppDispatch) => {
    dispatch(employeeActions.loadEventEmployees());
    try {
      await updateEmployeeApi(employee, id);
      history.push("/");
      dispatch(employeeActions.updateEmployeeSuccess());
    } catch (error: any) {
      if (error.response && error.response.data) {
        const errors = handleValidationError(
          error.response.data.validationErrors
        );
        dispatch(employeeActions.loadEmployeesError(errors));
      }
    }
  };

const deleteEmployee = (id: number) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await deleteEmployeeApi(id);
    dispatch(employeeActions.deleteEmployeeSuccess(data));
  } catch (error: any) {
    if (error.response && error.response.data) {
      const errors = handleErrorNotFound(error.response.data.message);
      dispatch(employeeActions.deleteEmployeesError(errors));
    }
  }
};

const employeeAcs = {
  resetEmployee,
  loadEmployees,
  loadEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee
};

export default employeeAcs;
