import type {ReactNode} from 'react';
import React, { useEffect, useState } from 'react';
import { store } from "@/store/store";
import employeesJson from '@/data/employees.json'
import type { EmployeeType } from "@/models/employee";
import { Provider, useDispatch } from "react-redux";
import { setEmployees } from "@/store/slices/employee.slice";

// const getData = async () => new Promise((res) => setTimeout(() => res(employeesJson), 3000))
//
// const InitDataProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
//     const dispatch = useDispatch()
//     useEffect(() => {
//         (async () => {
//             const response = await getData<EmployeeType[]>()
//             dispatch(setEmployees(response))
//         })()
//     }, [])
//
//     return (
//         <>{ children }</>
//     )
// }

const MainProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
    return  (
        <Provider store={store}>
            {/*<InitDataProvider>*/}
                { children }
            {/*</InitDataProvider>*/}
        </Provider>
    )
}

export default MainProvider