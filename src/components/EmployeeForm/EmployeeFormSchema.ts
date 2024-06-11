import { z } from 'zod'
import {formatDate} from "@/utils/formateDate";
import validator from "validator";

const phoneRegExp = /^\+\d{1,3} \(\d{1,3}\) \d{3}-\d{4}$/
const dateRegExp = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/

export const employeeFormSchema = z.object({
    name: z.string().min(1, { message: 'Введите имя' }),
    isArchive: z.boolean(),
    role: z.string().min(1, { message: 'Выберите должность'})
        .refine((data) => data !== 'Выберите должность', 'Выберите должность'),
    phone: z.string()
        .refine((data) => phoneRegExp.test(data), 'Введите номер телефона в формате +7 (XXX) XXX-XXXX'),
    birthday: z.string()
        .refine((data) => validator.isDate(formatDate(data)), 'Введите корректную дату'),

})

export type EmployeeFormDataType = z.infer<typeof employeeFormSchema>