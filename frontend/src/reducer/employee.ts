import { employeeStateType } from "../interface/type";
import { createSlice } from "@reduxjs/toolkit";
import employee from "../actions/employee";

const employeeState: employeeStateType = {
  error: null,
  loading: false,
  loadingEvent: false,
  employees: null,
  employee: null
};

const employeeSlice = createSlice({
  name: "employee",
  initialState: employeeState,
  reducers: {
    resetEmployee(state: employeeStateType): employeeStateType {
      return {
        ...state,
        error: null,
        loading: false,
        loadingEvent: false,
        employees: null,
        employee: null,
      };
    },
    loadEmployees(state: employeeStateType): employeeStateType {
      return {
        ...state,
        error: null,
        loading: true,
        loadingEvent: false,
        employees: null,
        employee: null,
      };
    },
    loadEventEmployees(state: employeeStateType): employeeStateType {
      return {
        ...state,
        error: null,
        loading: true,
        loadingEvent: true,
        employees: null,
        employee: null,
      };
    },
    loadEmployeesSuccess(state: employeeStateType, action): employeeStateType {
      return {
        ...state,
        error: null,
        loading: false,
        loadingEvent: false,
        employees: action.payload,
        employee: null,
      };
    },
    loadEmployeeSuccess(state: employeeStateType, action): employeeStateType {
      return {
        ...state,
        error: null,
        loading: false,
        loadingEvent: false,
        employees: null,
        employee: action.payload
      };
    },
    createEmployeeSuccess(state: employeeStateType): employeeStateType {
      return {
        ...state,
        error: null,
        loading: false,
        loadingEvent: false,
        employees: null,
        employee: null,
      };
    },
    updateEmployeeSuccess(state: employeeStateType): employeeStateType {
      return {
        ...state,
        error: null,
        loading: false,
        loadingEvent: false,
        employees: null,
        employee: null,
      };
    },
    deleteEmployeeSuccess(state: employeeStateType, action): employeeStateType {
      return {
        ...state,
        error: null,
        loading: false,
        loadingEvent: false,
        employees: action.payload,
        employee: null,
      };
    },
    loadEmployeesError(state: employeeStateType, action): employeeStateType {
      return {
        ...state,
        error: action.payload,
        loading: false,
        loadingEvent: false,
        employees: null,
        employee: null,
      };
    },
    deleteEmployeesError(state: employeeStateType, action): employeeStateType {
      return {
        ...state,
        error: action.payload,
        loading: false,
        loadingEvent: false,
        employees: state.employees,
        employee: null,
      };
    },
  },
});

export const employeeActions = employeeSlice.actions;

export default employeeSlice.reducer;
