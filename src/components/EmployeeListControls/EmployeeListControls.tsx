import styles from './EmployeeListControls.module.scss'

import type { Dispatch, FC } from "react";
import type { EmployeeType } from "@/models/employee";

import CheckBox from "@/components/UI/CheckBox/CheckBox";
import Dropdown from "@/components/UI/Dropdown/Dropdown";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

import ArrowSvg from "@/components/UI/SvgIcons/Arrow.svg";
import { formatDate } from "@/utils/formateDate";
import employeesRoles from '@/data/EmployeeRoles'

const DEFAULT_OPTION = 'Показывать все'

const rotation: { [key: string]: string } = {
    asc: styles.asc,
    desc: styles.desc,
    none: styles.none
}

type EmployeeListProps = {
    employees: EmployeeType[],
    setModifiedEmployeesList: Dispatch<React.SetStateAction<EmployeeType[]>>
}

const EmployeeListControls: FC<EmployeeListProps> = ({ employees, setModifiedEmployeesList }) => {
    const [copiedEmployees, setCopiedEmployees] = useState([...employees])

    const [filteredEmployees, setFilteredEmployees] = useState([...employees])

    const [sortByNameDirection, setSortByNameDirection] = useState('none')
    const [sortByBirthdayDirection, setSortByBirthdayDirection] = useState('none')
    const [checkBoxValue, setCheckBoxValue] = useState(false)
    const [selectedOption, setSelectedOption] = useState(DEFAULT_OPTION)

    const employeesRoles = [...new Set(employees.map(emp => emp.role))]

    const handleSortByName = () => {
        let sortedEmployees

        if (sortByNameDirection === 'none') {
            sortedEmployees = [...copiedEmployees].sort((a, b) => a.name.localeCompare(b.name))
            setSortByNameDirection('asc')
        } else if (sortByNameDirection === 'asc') {
            sortedEmployees = [...copiedEmployees].sort((a, b) => b.name.localeCompare(a.name))
            setSortByNameDirection('desc')
        } else {
            sortedEmployees = filteredEmployees
            setSortByNameDirection('none')
        }

        setCopiedEmployees(sortedEmployees)
        setSortByBirthdayDirection('none')
        setModifiedEmployeesList(sortedEmployees)

    }

    const handleSortByBirthday = () => {
        let sortedEmployees

        if (sortByBirthdayDirection === 'none') {
            sortedEmployees = [...copiedEmployees].sort((a, b) => {
                const dateA = +new Date(formatDate(a.birthday))
                const dateB = +new Date(formatDate(b.birthday))
                return dateA - dateB
            })

            setSortByBirthdayDirection('asc')
        } else if (sortByBirthdayDirection === 'asc') {
            sortedEmployees = [...copiedEmployees].sort((a, b) => {
                const dateA = +new Date(formatDate(a.birthday))
                const dateB = +new Date(formatDate(b.birthday))
                return dateB - dateA
            })

            setSortByBirthdayDirection('desc')
        } else {
            sortedEmployees = filteredEmployees

            setSortByBirthdayDirection('none')
        }

        setCopiedEmployees(sortedEmployees)
        setSortByNameDirection('none')
        setModifiedEmployeesList(sortedEmployees)
    }

    useEffect(() => {
        let filteredEmployees

        if (selectedOption === DEFAULT_OPTION) {
            filteredEmployees = employees.filter(emp => emp.isArchive === checkBoxValue);
        } else {
            filteredEmployees = employees.filter(emp => emp.role === selectedOption && emp.isArchive === checkBoxValue);
        }

        setCopiedEmployees(filteredEmployees)
        setFilteredEmployees(filteredEmployees)
        setModifiedEmployeesList(filteredEmployees)

        setSortByNameDirection('none')
        setSortByBirthdayDirection('none')
    }, [selectedOption])


    const handleCheckBoxChange = (value: boolean) => {
        setCheckBoxValue(value)
        let filteredEmployees2 = employees.filter(emp => emp.isArchive === value)

        if (selectedOption !== DEFAULT_OPTION) {
            filteredEmployees2 = filteredEmployees2.filter(emp => emp.role === selectedOption)
        }

        setCopiedEmployees(filteredEmployees2)
        setFilteredEmployees(filteredEmployees2)
        setModifiedEmployeesList(filteredEmployees2)

        setSortByNameDirection('none')
        setSortByBirthdayDirection('none')
    }

    return (
        <div className={styles.section__header}>
            <div className={styles.top}>
                <div className={styles.topHeader}>
                    <h1>Сотрудники</h1>
                    <Link to={'/employee/new'} className={styles.btnAdd}>
                        +
                    </Link>
                </div>

                <div className={styles.topControls}>
                    <div className={cn([styles.listControl, styles.listSort, styles.dateBirthSort])}>
                        <button onClick={handleSortByBirthday}>Дата рождения</button>
                        <div className={cn([styles.svgWrapper, rotation[sortByBirthdayDirection]])}>
                            <ArrowSvg />
                            <span></span>
                        </div>
                    </div>
                    <div className={cn([styles.listControl, styles.listSort, styles.name, 'show-mobile'])}>
                        <button onClick={handleSortByName}>Имя</button>
                        <div className={cn([styles.svgWrapper, rotation[sortByNameDirection]])}>
                            <ArrowSvg />
                            <span></span>
                        </div>
                    </div>
                    <CheckBox classNames={[styles.checkbox, 'hidden-mobile']} onChange={handleCheckBoxChange} />
                    <Dropdown classNames={styles.jobTitleDropDown} defaultOption={DEFAULT_OPTION} options={employeesRoles} handleDropdownSelection={setSelectedOption} />

                </div>
            </div>
            <div className={styles.listControls}>
                <div className={cn([styles.listControl, styles.listSort, styles.name, 'hidden-mobile'])}>
                    <button onClick={handleSortByName} >Имя фамилия</button>
                    <div className={cn([styles.svgWrapper, rotation[sortByNameDirection]])}>
                        <ArrowSvg />
                        <span></span>
                    </div>
                </div>

                <CheckBox classNames={[styles.checkbox, 'show-mobile']} onChange={handleCheckBoxChange} />

                <div className={ cn([styles.listControl, styles.jobTitle, 'hidden-mobile'])}>Должность</div>
                <div className={cn([styles.listControl, styles.phoneNumber, 'hidden-mobile'])}>Номер телефона</div>
            </div>
        </div>
    )
}

export default EmployeeListControls