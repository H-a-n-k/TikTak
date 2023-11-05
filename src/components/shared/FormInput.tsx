
export enum FormInputType { 
    text = 'text',
    number = 'number',
    date = 'date',
    datetime = 'datetime-local',
    radio = 'radio',
    select = 'select'
}

export interface SelectOpt { 
    val: string,
    display: string
}

export interface FormInputInfo { 
    type: FormInputType,
    name: string, //id, name
    label: string,
    placeHolder?: string,
    autoFocus?: boolean,
    hidden?: boolean,

    options?: SelectOpt[]
}

export interface FormInputData {
    formData: any,
    setFormData: React.Dispatch<React.SetStateAction<any>>,
    submitForm: () => void
}

interface FormInputProps extends FormInputData, FormInputInfo { 
    
}

export default function FormInput(
    { type, name, label, placeHolder, formData, setFormData, submitForm, autoFocus, hidden, options }: FormInputProps)
{  
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { 
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

    if (type === FormInputType.select) { 
        if(!options) return <></>

        return <>
            {!hidden && <label htmlFor={name}>{label}</label>}
            <select name={name} id={name} value={formData[name] ?? '-1'} onChange={onChange} hidden={hidden}>
                <option value="-1">None</option>
                {options.map((x, ind) => <>
                    <option key={x.val} value={x.val}>
                        {x.display}
                    </option>
                </>)}
            </select>
        </>
    }

    return <>
        {!hidden && <label htmlFor={name}>{label}</label> }
        <input type={type} id={name} name={name} placeholder={placeHolder} autoFocus={autoFocus}
            value={formData[name]} onChange={onChange} onKeyDown={onKeyDown} hidden={hidden}
        />
    </>
}