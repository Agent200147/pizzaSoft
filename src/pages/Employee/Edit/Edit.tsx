import styles from './Edit.module.scss';

import type { FC } from "react";
import type { EmployeeFormDataType } from "@/components/EmployeeForm/EmployeeFormSchema";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editEmployee, selectEmployees } from "@/store/slices/employee.slice";
import EmployeeForm from "@/components/EmployeeForm/EmployeeForm";
import NotFound from "@/pages/NotFound/NotFound";

const Edit: FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { id } = useParams()
    const employees = useSelector(selectEmployees)
    const employee = employees.find(emp => emp.id === Number(id))

    if (!employee) return <NotFound />

    const onSubmit = (data: Omit<EmployeeFormDataType, 'id'>) => {
        console.log(data)
        dispatch(editEmployee({...employee, ...data}))
        navigate('/')
    }

    return (
        <section className={styles.section}>
            <EmployeeForm onSubmitAction={onSubmit} title='Редактирование сторудника' btnName='Редактировать' employee={employee} />
        </section>
    )
}

export default Edit