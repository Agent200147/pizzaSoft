import styles from "./EmployeeForm.module.scss";

import type { FC } from 'react';
import type { EmployeeType } from "@/models/employee";
import type { EmployeeFormDataType } from "@/components/EmployeeForm/EmployeeFormSchema";

import { InputMask } from "@react-input/mask";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeFormSchema } from "@/components/EmployeeForm/EmployeeFormSchema";
import Dropdown from "@/components/UI/Dropdown/Dropdown";
import CheckBox from "@/components/UI/CheckBox/CheckBox";
import ErrorMessage from "@/components/UI/ErrorMessage/ErrorMessage";
import employeeRoles from "@/data/EmployeeRoles";

type EmployeeFormProps = {
    onSubmitAction: (data: Omit<EmployeeFormDataType, 'id'>) => void,
    title: string,
    btnName: string,
    employee?: EmployeeType
}

const EmployeeForm: FC<EmployeeFormProps> = ({ onSubmitAction, title, btnName, employee }) => {
    const form = useForm<EmployeeFormDataType>({
        defaultValues: employee || {
            name: '',
            isArchive: false,
            role: '',
            phone: '',
            birthday: ''
        },
        resolver: zodResolver(employeeFormSchema),
        mode: 'onChange'
    })

    const { register, handleSubmit, formState, setValue } = form
    const { errors } = formState

    return (
        <div className={styles.formContainer}>
            <h1>{title}</h1>
            <form onSubmit={handleSubmit(onSubmitAction)} className={styles.form}>

                <div className={styles.field}>
                    <input className={errors.name?.message ? styles.invalid : ''} type="text" { ...register('name') } placeholder='Имя' />
                    <ErrorMessage errorMessage={errors.name?.message} />
                </div>

                <div className={styles.field}>
                    <InputMask { ...register('phone') } type='tel' mask="+7 (___) ___-____" placeholder="+7 (___) ___-____"  replacement={{ _: /\d/ }}/>
                    <ErrorMessage errorMessage={errors.phone?.message} />
                </div>

                <div className={styles.field}>
                    <InputMask { ...register('birthday') } type='tel' mask="дд.мм.гггг" placeholder="дд.мм.гггг" replacement={{ 'д': /\d/, 'м': /\d/, 'г': /\d/ }}/>
                    <ErrorMessage errorMessage={errors.birthday?.message} />
                </div>


                <div className={styles.field}>
                    <Dropdown handleDropdownSelection={(v) => setValue('role', v, { shouldValidate: true })} classNames={styles.dropDown} placeholder='Выберите должность' defaultOption={employee?.role} options={employeeRoles} />
                    <ErrorMessage errorMessage={errors.role?.message} />
                </div>

                <CheckBox classNames={[styles.checkbox]} register={register} name='isArchive' />
                <button type='submit' data-testid='submit-button'>
                    {btnName}
                </button>

            </form>
        </div>
    )
}

export default EmployeeForm