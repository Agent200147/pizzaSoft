import {render} from "@testing-library/react";
import EmployeeForm from "@/components/EmployeeForm/EmployeeForm";
import Index from "@/pages/Index/Index";
import {withMemoryRouteAndReduxProvider} from "@/utils/withMemoryRouter";

describe('IndexPage', () => {

    test('test sorting and filtering', () => {
        render(withMemoryRouteAndReduxProvider(<Index/>))
    })

})
