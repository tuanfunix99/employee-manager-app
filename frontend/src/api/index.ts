import axios from "axios";
import { employeeType } from "../interface/type";

axios.defaults.baseURL = "http://localhost:8080";

export const loadEmployeesApi = () => axios.get("/api/employees");

export const loadEmployeeApi = (id: any) => axios.get(`/api/employees/${id}`);

export const createEmployeeApi = (employee: employeeType) =>
  axios.post("/api/employees", employee);

export const updateEmployeeApi = (employee: employeeType, id: any) =>
  axios.patch(`/api/employees/${id}`, employee);

export const deleteEmployeeApi = (id: any) =>
  axios.delete(`/api/employees/${id}`);
