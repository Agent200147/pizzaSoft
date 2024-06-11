import styles from './EmployeeItem.module.scss'

import type { FC } from "react";
import type { EmployeeType } from "@/models/employee";
import cn from "classnames";
import {Link} from "react-router-dom";

type EmployeeItemProps = {
    employee: EmployeeType
}

const EmployeeItem: FC<EmployeeItemProps> = ({ employee }) => {
    return (
        <Link to={`/employee/edit/${employee.id}`} data-testid='employee-item' className={cn([styles.employee, employee.isArchive ? styles.archived : '']) }>
            <div className={cn([styles.item, styles.name])}>
                <span className='show-mobile'>Имя</span> {employee.name}
            </div>
            <div className={cn([styles.item, styles.jobTitle])}>
                <span className='show-mobile'>Должность</span> {employee.role}
            </div>
            <div className={styles.item}>
                <span className='show-mobile'>Номер</span> {employee.phone}
            </div>
        </Link>
    )
}

// <tr className={styles.item}>
//     <td>{employee.name}</td>
//     <td>{employee.role}</td>
//     <td>{employee.phone}</td>
//     <td>{employee.birthday}</td>
// </tr>

export default EmployeeItem;