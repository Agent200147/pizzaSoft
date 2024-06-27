import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {withMemoryRouteAndReduxProvider} from "@/utils/withMemoryRouter";
import EmployeeList from "@/components/EmployeeList/EmployeeList";
import employeesJson from "@/data/employees.json";
import EmployeeForm from "@/components/EmployeeForm/EmployeeForm";
import {EmployeeFormDataType} from "@/components/EmployeeForm/EmployeeFormSchema";

describe('EmployeeForm', () => {
    test('submit form with correct data', async () => {
        const handleFormSubmit = jest.fn()

        render(withMemoryRouteAndReduxProvider(<EmployeeForm onSubmitAction={handleFormSubmit} title='Создание пользователя' btnName='Создать'/>))

        const { getByTestId } = screen

        const employeeData = {
            name: 'Никита',
            isArchive: false,
            role: 'cook',
            phone: '+7 (983) 508-3269',
            birthday: '01.01.2001',
        }

        const nameInput = screen.getByTestId('name')
        const phoneInput = screen.getByTestId('phone')
        const birthdayInput = screen.getByTestId('birthday')
        const roleInput = screen.getByTestId('role')
        const isArchiveInput = screen.getByTestId('isArchive')

        fireEvent.change(nameInput, { target: { value: employeeData.name } })
        fireEvent.change(phoneInput, { target: { value: employeeData.phone } })
        fireEvent.change(birthdayInput, { target: { value: employeeData.birthday } })
        fireEvent.change(isArchiveInput, { target: { checked: employeeData.isArchive } })

        fireEvent.click(roleInput)
        const roleOption = screen.getByText(employeeData.role)
        fireEvent.click(roleOption)

        const submitButton = getByTestId('submit-button')
        await fireEvent.click(submitButton)


        await waitFor(async() => {
            expect(handleFormSubmit).toHaveBeenCalledTimes(1)
            expect(handleFormSubmit.mock.calls[0][0]).toEqual(employeeData)

        })

    })

    test('submit form with incorrect data', async () => {
        const handleFormSubmit = jest.fn()

        render(withMemoryRouteAndReduxProvider(<EmployeeForm onSubmitAction={handleFormSubmit} title='Создание пользователя' btnName='Создать'/>))

        const { getByTestId } = screen

        const employeeData = {
            name: 'Никита',
            isArchive: false,
            role: 'cook',
            phone: '+7 (983) 508-3269',
            birthday: '01.20.2001',
        }

        const nameInput = screen.getByTestId('name')
        const phoneInput = screen.getByTestId('phone')
        const birthdayInput = screen.getByTestId('birthday')
        const roleInput = screen.getByTestId('role')
        const isArchiveInput = screen.getByTestId('isArchive')

        fireEvent.change(nameInput, { target: { value: employeeData.name } })
        fireEvent.change(phoneInput, { target: { value: employeeData.phone } })
        fireEvent.change(birthdayInput, { target: { value: employeeData.birthday } })
        fireEvent.change(isArchiveInput, { target: { checked: employeeData.isArchive } })

        fireEvent.click(roleInput)
        const roleOption = screen.getByText(employeeData.role)
        fireEvent.click(roleOption)

        const submitButton = getByTestId('submit-button')
        await fireEvent.click(submitButton)


        await waitFor(async() => {
            expect(handleFormSubmit).toHaveBeenCalledTimes(0)
            const error = await screen.getByTestId('form-error')
            expect(error).toHaveTextContent('Введите корректную дату')
        })

    })
})