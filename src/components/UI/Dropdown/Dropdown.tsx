import styles from './Dropdown.module.scss'

import type { FC } from "react";

import {useEffect, useRef, useState} from "react";
import cn from "classnames";

import Dropdown2 from 'react-dropdown';
import 'react-dropdown/style.css';
import HalfArrowSvg from "@/components/UI/SvgIcons/HalfArrow.svg";

type DropdownProps = {
    classNames: string | string[],
    defaultOption?: string,
    placeholder?: string,
    options: string[],
    handleDropdownSelection?: (option: string) => void,
}

const Dropdown: FC<DropdownProps> = ({ classNames, defaultOption, placeholder, options, handleDropdownSelection }) => {
    const [selectedOption, setSelectedOption] = useState(defaultOption)
    const [isShow, setIsShow] = useState(false)
    const dropDownRef = useRef<HTMLDivElement>(null)

    const handleSelectOption = (option: string) => {
        setSelectedOption(option)
        handleDropdownSelection && handleDropdownSelection(option)
        console.log(option)
        setIsShow(false)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!dropDownRef.current) {
                return
            }

            const target = event.target as HTMLElement

            if (!dropDownRef.current.contains(target)) {
                setIsShow(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])


    return (
        <div ref={dropDownRef} className={cn([styles.dropDown, classNames, isShow ? styles.dropDownOpened : ''])}>
            <button type='button' onClick={() => setIsShow(prev => !prev)}>
                {
                    placeholder && !selectedOption
                        ? <span className={styles.placeholder}>{placeholder}</span>
                        : <span className="selected-item">{selectedOption || options[0]}</span>
                }
                <div className={cn([styles.halfArrowSvgWrapper, isShow ? styles.rotated : ''])}>
                    <HalfArrowSvg />
                </div>
                {/*<img src="img/chevron-down.svg" alt=""/>*/}
            </button>
            {
                isShow &&
                <ul className={styles.list}>
                    {defaultOption && <li onClick={() => handleSelectOption(defaultOption)}>{defaultOption}</li>}
                    {options.map((opt, index) => {
                        if (opt !== defaultOption) return <li key={index} onClick={() => handleSelectOption(opt)}>{opt}</li>
                    })}
                </ul>
            }
        </div>
    )
}

export default Dropdown;