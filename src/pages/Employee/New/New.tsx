import styles from './New.module.scss'

import type { EmployeeFormDataType } from "@/components/EmployeeForm/EmployeeFormSchema";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import EmployeeForm from "@/components/EmployeeForm/EmployeeForm";
import { addEmployee }  from '@/store/slices/employee.slice'
import {generateUniqueId} from "@/utils/generateUniqueId";

const New = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = (data: Omit<EmployeeFormDataType, 'id'>) => {
        dispatch(addEmployee({id: generateUniqueId(), ...data}))
        navigate("/")
    }

    return (
        <section className={styles.section}>
            <EmployeeForm onSubmitAction={onSubmit} title='Создание сотрудника' btnName='Создать' />
        </section>
    )
}

export default New