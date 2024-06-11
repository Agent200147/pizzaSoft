import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "@/store/slices/employee.slice";
import employeesJson from '@/data/employees.json'

const preloadedState = {
    employees: {
        employees: employeesJson
    }
}

export const store = configureStore({
    reducer: {
        employees: employeeReducer,
    },
    preloadedState
})

export type RootState = ReturnType<typeof store.getState>
