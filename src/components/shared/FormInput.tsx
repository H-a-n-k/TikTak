import { useEffect } from "react";
import GeneralObject from "../../models/GeneralObject"
import { ToYMDFormat } from "../../utils/datetime";

export enum FormInputType { 
    text = 'text',
    number = 'number',
    date = 'date',
    dropdown = 'dropdown',
    radio = 'radio'
}

export interface FormInputInfo { 
    type: FormInputType,
    name: string, //id, name
    label: string,
    placeHolder?: string,
    autoFocus?: boolean,
    hidden?: boolean
}

export interface FormInputData {
    formData: any,
    setFormData: React.Dispatch<React.SetStateAction<any>>,
    submitForm: () => void
}

interface FormInputProps extends FormInputData, FormInputInfo { 
    
}

export default function FormInput(
    { type, name, label, placeHolder, formData, setFormData, submitForm, autoFocus, hidden }: FormInputProps)
{  
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        const target = e.target;
        var value: any = target.value;
        if (type === FormInputType.number) value = parseInt(target.value)

        setFormData({ ...formData, [target.id]: value })
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => { 
        if (e.key === 'Enter') { 
            submitForm()
        }

        if (type === FormInputType.number) { 
            if (e.key === 'e') e.preventDefault();
        }
    }

    return <>
        {!hidden && <label htmlFor={name}>{label}</label> }
        <input type={type} id={name} name={name} placeholder={placeHolder} autoFocus={autoFocus}
            value={formData[name]} onChange={onChange} onKeyDown={onKeyDown} hidden={hidden}
        />
    </>
}