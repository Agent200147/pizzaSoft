import { BrowserRouter, MemoryRouter} from "react-router-dom";
import { render, screen } from "@testing-library/react";
import EmployeeItem from "./EmployeeItem";
import {withMemoryRouteAndReduxProvider} from "@/utils/withMemoryRouter";


describe('EmployeeItem', () => {
    test('renders employee data correctly', async () => {
        const employee = {
            id: 111,
            name: 'Никита',
            isArchive: false,
            role: 'cook',
            phone: '+7 (983) 508-3269',
            birthday: '01.01.2001',
        }
        render(withMemoryRouteAndReduxProvider(<EmployeeItem employee={employee}/>))

        const employeeElement = screen.getByTestId('employee-item')

        expect(employeeElement).toHaveAttribute('href', `/employee/edit/${employee.id}`)
        expect(employeeElement).toHaveTextContent(employee.name)
        expect(employeeElement).toHaveTextContent(employee.role)
        expect(employeeElement).toHaveTextContent(employee.phone)
    })

    test('having archived class', () => {
        const archivedEmployee = {
            id: 111,
            name: 'Никита',
            isArchive: true,
            role: 'cook',
            phone: '+7 (983) 508-3269',
            birthday: '01.01.2001',
        }
        render(withMemoryRouteAndReduxProvider(<EmployeeItem employee={archivedEmployee}/>))

        const employeeElement = screen.getByTestId('employee-item')
        expect(employeeElement).toHaveClass('archived')
    })
})