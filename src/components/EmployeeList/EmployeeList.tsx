import styles from './EmployeeList.module.scss'

import type { FC } from "react";
import type { EmployeeType } from "@/models/employee";

import EmployeeItem from "@/components/EmployeeItem/EmployeeItem";

type EmployeeListProps = {
    employees: EmployeeType[]
}

const EmployeeList: FC<EmployeeListProps> = ({ employees }) => {
    return (

    <div className={styles.list}>
        { !!employees.length
            ? employees.map(employee => <EmployeeItem key={employee.id} employee={employee} />)
            : <div className={styles.messageEmpty}>Упс! Кажется сотрудники не найдены</div>
        }
    </div>
    )
}

export default EmployeeList