import styles from "./CheckBox.module.scss";

import type { FC } from "react";

import {useId, useState} from "react";
import CheckMarkSvg from "@/components/UI/SvgIcons/CheckMark.svg";
import {UseFormRegister} from "react-hook-form";
import {EmployeeFormDataType} from "@/components/EmployeeForm/EmployeeFormSchema";
import cn from "classnames";

type CheckBoxProps = {
    classNames?: string[];
    onChange?: (value: boolean) => void
    name?: keyof EmployeeFormDataType,
    register?: UseFormRegister<EmployeeFormDataType>,
    dataTestId?: string,
}

const CheckBox: FC<CheckBoxProps> = ({classNames = [], onChange, name, register, dataTestId }) => {
    const checkBoxId = useId()

    return (
        <div className={cn([styles.checkBox, ...classNames])}>
            <input onChange={(e) => onChange && onChange(e.target.checked)} {...register && name && register(name)} type="checkbox" id={checkBoxId} data-testid={dataTestId}/>
            <label htmlFor={checkBoxId}>
                <span className={styles.text}>В архиве</span>
                <span className={styles.customCheckboxWrapper}>
                    <CheckMarkSvg />
                </span>
            </label>
        </div>
    )
}

export default CheckBox