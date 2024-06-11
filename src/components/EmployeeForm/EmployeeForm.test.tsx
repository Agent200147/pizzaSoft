import {fireEvent, render, screen} from "@testing-library/react";
import {withMemoryRouteAndReduxProvider} from "@/utils/withMemoryRouter";
import EmployeeList from "@/components/EmployeeList/EmployeeList";
import employeesJson from "@/data/employees.json";
import EmployeeForm from "@/components/EmployeeForm/EmployeeForm";
import {EmployeeFormDataType} from "@/components/EmployeeForm/EmployeeFormSchema";

describe('EmployeeForm', () => {
    test('submit form with correct data', () => {
        const handleFormSubmit = jest.fn()

        render(withMemoryRouteAndReduxProvider(<EmployeeForm onSubmitAction={handleFormSubmit} title='Создание пользователя' btnName='Создать'/>))
    })

})