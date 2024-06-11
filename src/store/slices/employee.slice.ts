import type { EmployeeType } from "@/models/employee";
import type { RootState } from "@/store/store.ts";

import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type InitialState = {
    employees: EmployeeType[],
}

const initialState: InitialState = {
    employees: [],
}

const slice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        setEmployees: (state, action: PayloadAction<EmployeeType[]>) => {
            state.employees = action.payload
        },

        addEmployee: (state, action: PayloadAction<EmployeeType>) => {
            state.employees.unshift(action.payload)
        },

        editEmployee: (state, action: PayloadAction<EmployeeType>) => {
            state.employees =  state.employees.map(employee => {
                if (employee.id === action.payload.id) {
                    return { ...employee, ...action.payload }
                }
                return employee
            })
        }
    }
})

export const { setEmployees, addEmployee, editEmployee } = slice.actions
export default slice.reducer

export const selectEmployees = (state: RootState) => state.employees.employees
