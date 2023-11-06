
export enum FormInputType { 
    text = 'text',
    number = 'number',
    date = 'date',
    datetime = 'datetime-local',
    radio = 'radio',
    selectNumber = 'select',
}

export interface SelectOpt { 
    val: any,
    display: string
}

//inputs that cant be generalized
export type FormInputGenerator = {
    generator: (formData: any, setFormData: React.Dispatch<React.SetStateAction<any>>) => JSX.Element
}

export interface FormInputInfo { 
    type: FormInputType,
    name: string, //id, name
    label: string,
    placeHolder?: string,
    autoFocus?: boolean,
    hidden?: boolean,
    required?: boolean,

    options?: SelectOpt[],
}

export interface FormInputData {
    formData: any,
    setFormData: React.Dispatch<React.SetStateAction<any>>,
    submitForm: () => void
}
type TemplateInput = FormInputData & FormInputInfo
type CustomInput = FormInputData & FormInputGenerator
type FormInputProps = TemplateInput | CustomInput

export default function FormInput( props: FormInputProps)
{  
    var { type, name, label, placeHolder, formData, setFormData, submitForm, autoFocus, hidden, required, options } = props as TemplateInput;
    // eslint-disable-next-line
    var { generator, formData, setFormData } = props as CustomInput

    if (typeof generator === 'function') {
        return generator(formData, setFormData)
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { 
        const target = e.target;
        var value: any = target.value;
        if ([FormInputType.number, FormInputType.selectNumber].includes(type)) value = parseInt(target.value)

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

    if ([FormInputType.selectNumber].includes(type)) { 
        if(!options) return <></>

        return <>
            {!hidden && <label htmlFor={name}>{label}</label>}
            <select name={name} id={name} value={formData[name] ?? '-1'} onChange={onChange} hidden={hidden}>
                <option value="-1">None</option>
                {options.map((x, ind) => <option key={x.val} value={x.val}>
                    {x.display}
                </option>)}
            </select>
        </>
    }

    return <>
        {!hidden && <label htmlFor={name}>{label}</label> }
        <input type={type} id={name} name={name} placeholder={placeHolder} autoFocus={autoFocus} required={required}
            value={formData[name]} onChange={onChange} onKeyDown={onKeyDown} hidden={hidden}
        />
    </>
}