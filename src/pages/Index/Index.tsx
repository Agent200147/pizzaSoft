import styles from './Index.module.scss'

import { useSelector } from "react-redux";
import { useState } from "react";
import { selectEmployees } from "@/store/slices/employee.slice";
import EmployeeList from "@/components/EmployeeList/EmployeeList";
import EmployeeListControls from "@/components/EmployeeListControls/EmployeeListControls";

const Index = () => {
    const employees = useSelector(selectEmployees)
    const [modifiedEmployeesList, setModifiedEmployeesList] = useState([...employees])

    return (
        <section className={styles.section}>
            <EmployeeListControls setModifiedEmployeesList={setModifiedEmployeesList} employees={employees} />
            <EmployeeList employees={modifiedEmployeesList} />
        </section>
    )
}

export default Index