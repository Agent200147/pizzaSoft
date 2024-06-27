import { render, screen } from "@testing-library/react";
import EmployeeList from "./EmployeeList";
import employeesJson from '@/data/employees.json'
import { withMemoryRouteAndReduxProvider } from "@/utils/withMemoryRouter";

describe('EmployeeList', () => {
    test('renders list', async () => {
        render(withMemoryRouteAndReduxProvider(<EmployeeList employees={employeesJson}/>))

        const { getAllByTestId } = screen

        const employees = getAllByTestId('employee-item')
        expect(employees).toHaveLength(employeesJson.length)
    })

    test('correct href containing', async () => {
        render(withMemoryRouteAndReduxProvider(<EmployeeList employees={employeesJson}/>))

        const { getAllByTestId } = screen

        const employees = getAllByTestId('employee-item')
        employeesJson.forEach((employee, index) => {
            expect(employees[index]).toHaveAttribute('href', `/employee/edit/${employee.id}`)
        })
    })

    test('list items with correct employee data', async () => {
        render(withMemoryRouteAndReduxProvider(<EmployeeList employees={employeesJson}/>))

        const { getAllByTestId } = screen

        const employees = getAllByTestId('employee-item')

        employeesJson.forEach((employee, index) => {
            expect(employees[index]).toHaveAttribute('href', `/employee/edit/${employee.id}`)
            expect(employees[index]).toHaveTextContent(employee.name)
            expect(employees[index]).toHaveTextContent(employee.role)
            expect(employees[index]).toHaveTextContent(employee.phone)
        })
    })

    test('empty list message', async () => {
        render(withMemoryRouteAndReduxProvider(<EmployeeList employees={[]}/>))

        const { getByText } = screen

        const message = getByText('Упс! Кажется сотрудники не найдены')
        expect(message).toBeInTheDocument()
    })
})