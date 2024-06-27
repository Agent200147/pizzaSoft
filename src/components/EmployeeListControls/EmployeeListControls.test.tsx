import { fireEvent, render, screen } from "@testing-library/react";

import { withMemoryRouteAndReduxProvider } from "@/utils/withMemoryRouter";
import employeesJson from "@/data/employees.json";
import employeeRoles from "@/data/EmployeeRoles";

import EmployeeListControls from "@/components/EmployeeListControls/EmployeeListControls";
import {formatDate} from "@/utils/formateDate";

describe('EmployeeControls', () => {
    test('sort by name', async () => {
        const setModifiedEmployeesList = jest.fn()

        render(withMemoryRouteAndReduxProvider(<EmployeeListControls employees={employeesJson} setModifiedEmployeesList={setModifiedEmployeesList}/>))
        const employeesJsonFilteredByIsArchivedDefault = [...employeesJson].filter(emp => !emp.isArchive)

        expect(setModifiedEmployeesList).toHaveBeenCalledTimes(1)
        expect(setModifiedEmployeesList).toHaveBeenCalledWith(employeesJsonFilteredByIsArchivedDefault)

        const { getByTestId } = screen

        const sortByNameBtn = getByTestId('sortByNameBtn')
        fireEvent.click(sortByNameBtn)

        const employeesSortedByNameAsc = [...employeesJsonFilteredByIsArchivedDefault].sort((a, b) => a.name.localeCompare(b.name))

        expect(setModifiedEmployeesList).toHaveBeenCalledTimes(2)
        expect(setModifiedEmployeesList).toHaveBeenNthCalledWith(2, employeesSortedByNameAsc)

        fireEvent.click(sortByNameBtn)

        const employeesSortedByNameDesc = [...employeesJsonFilteredByIsArchivedDefault].sort((a, b) => b.name.localeCompare(a.name))

        expect(setModifiedEmployeesList).toHaveBeenCalledTimes(3)
        expect(setModifiedEmployeesList).toHaveBeenNthCalledWith(3, employeesSortedByNameDesc)

        fireEvent.click(sortByNameBtn)

        expect(setModifiedEmployeesList).toHaveBeenCalledTimes(4)
        expect(setModifiedEmployeesList).toHaveBeenNthCalledWith(4, employeesJsonFilteredByIsArchivedDefault)
    })

    test('sort by birthday', async () => {
        const setModifiedEmployeesList = jest.fn()

        render(withMemoryRouteAndReduxProvider(<EmployeeListControls employees={employeesJson} setModifiedEmployeesList={setModifiedEmployeesList}/>))
        const employeesJsonFilteredByIsArchivedDefault = [...employeesJson].filter(emp => !emp.isArchive)

        expect(setModifiedEmployeesList).toHaveBeenCalledTimes(1)
        expect(setModifiedEmployeesList).toHaveBeenCalledWith(employeesJsonFilteredByIsArchivedDefault)

        const { getByTestId } = screen

        const sortByBirthdayBtn = getByTestId('sortByBirthdayBtn')
        fireEvent.click(sortByBirthdayBtn)

        const employeesSortedByBirthdayAsc = [...employeesJsonFilteredByIsArchivedDefault].sort((a, b) => {
            const dateA = +new Date(formatDate(a.birthday))
            const dateB = +new Date(formatDate(b.birthday))
            return dateA - dateB
        })

        expect(setModifiedEmployeesList).toHaveBeenCalledTimes(2)
        expect(setModifiedEmployeesList).toHaveBeenNthCalledWith(2, employeesSortedByBirthdayAsc)

        fireEvent.click(sortByBirthdayBtn)

        const employeesSortedByBirthdayDesc = [...employeesJsonFilteredByIsArchivedDefault].sort((a, b) => {
            const dateA = +new Date(formatDate(a.birthday))
            const dateB = +new Date(formatDate(b.birthday))
            return dateB - dateA
        })

        expect(setModifiedEmployeesList).toHaveBeenCalledTimes(3)
        expect(setModifiedEmployeesList).toHaveBeenNthCalledWith(3, employeesSortedByBirthdayDesc)

        fireEvent.click(sortByBirthdayBtn)

        expect(setModifiedEmployeesList).toHaveBeenCalledTimes(4)
        expect(setModifiedEmployeesList).toHaveBeenNthCalledWith(4, employeesJsonFilteredByIsArchivedDefault)
    })

    test('filter by isArchive status', async () => {
        const setModifiedEmployeesList = jest.fn()

        render(withMemoryRouteAndReduxProvider(<EmployeeListControls employees={employeesJson} setModifiedEmployeesList={setModifiedEmployeesList}/>))
        const employeesJsonFilteredByIsArchivedDefault = [...employeesJson].filter(emp => !emp.isArchive)

        expect(setModifiedEmployeesList).toHaveBeenCalledTimes(1)
        expect(setModifiedEmployeesList).toHaveBeenCalledWith(employeesJsonFilteredByIsArchivedDefault)

        const { getByTestId } = screen

        const filterByIsArchiveBtn = getByTestId('filterByIsArchiveCheckbox')
        fireEvent.click(filterByIsArchiveBtn)

       const employeesFilteredByIsArchiveBtn = [...employeesJson].filter(emp => emp.isArchive)

        expect(setModifiedEmployeesList).toHaveBeenCalledTimes(2)
        expect(setModifiedEmployeesList).toHaveBeenNthCalledWith(2, employeesFilteredByIsArchiveBtn)
    })

    test('filter by job title', async () => {
        const setModifiedEmployeesList = jest.fn()

        render(withMemoryRouteAndReduxProvider(<EmployeeListControls employees={employeesJson} setModifiedEmployeesList={setModifiedEmployeesList}/>))
        const employeesJsonFilteredByIsArchivedDefault = [...employeesJson].filter(emp => !emp.isArchive)

        expect(setModifiedEmployeesList).toHaveBeenCalledTimes(1)
        expect(setModifiedEmployeesList).toHaveBeenCalledWith(employeesJsonFilteredByIsArchivedDefault)

        const { getByTestId } = screen
        const selectOptionsBtn = getByTestId('filterByJobTitle')

        employeeRoles.forEach((role, index) => {
            fireEvent.click(selectOptionsBtn)
            const optionBtn = getByTestId(`${role}-option`)
            fireEvent.click(optionBtn)

            const employeesFilteredByJobTitle = employeesJsonFilteredByIsArchivedDefault.filter(emp => emp.role === role)
            expect(setModifiedEmployeesList).toHaveBeenCalledTimes(index + 2)
            expect(setModifiedEmployeesList).toHaveBeenNthCalledWith(index + 2, employeesFilteredByJobTitle)
        })
    })
})