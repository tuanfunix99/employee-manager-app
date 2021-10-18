import { ReactChild } from "react";

export interface employeeType {
  id?: number
  firstName: any
  lastName: any
  emailId: any
}

export interface employeeStateType{
  error: string[] | null
  loading: boolean,
  loadingEvent: boolean,
  employees: employeeType[] | null,
  employee: employeeType | null,
}

export interface alertType{
  alert: string
  children: ReactChild
}