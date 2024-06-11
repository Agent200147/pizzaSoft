import styles from './FormInput.module.scss'
import type { FC, InputHTMLAttributes } from "react";
import type { FieldValues, UseFormRegister } from 'react-hook-form';
import {EmployeeFormDataType} from "@/components/EmployeeForm/EmployeeFormSchema";

import cn from "classnames";

type InputProps<T extends FieldValues> = InputHTMLAttributes<HTMLInputElement> & {
    name: keyof T,
    errorMessage: string | undefined,
    register?: UseFormRegister<T>
}
export const FormInput: FC<InputProps<EmployeeFormDataType>> = ({ type, name, placeholder, errorMessage, register, ...props }) => {
    return (
        <div>
            <input type={type} {...register && register(name)} className={cn([styles.input, errorMessage && styles.inValidInput]) } placeholder={placeholder} {...props}/>
            <div className={styles.error}>{errorMessage}</div>
        </div>
    )
}