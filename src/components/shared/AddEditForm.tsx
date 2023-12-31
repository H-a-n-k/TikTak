import { useState } from "react";
import GeneralObject from "../../models/GeneralObject"
import DialogWrapper from "./DialogWrapper";
import FormInput, { FormInputGenerator, FormInputInfo } from "./FormInput";

interface Props<T> { 
    object: T,
    inputs: (FormInputInfo | FormInputGenerator)[],
    closeDialog: () => void,
    onSubmit: (t: T) => boolean,
}

export default function AddEditForm<T extends GeneralObject>({ object, inputs, closeDialog, onSubmit } : Props<T>) { 

    const [formData, setFormData] = useState<T>(object);

    const handleSubmit = () => {
        if (onSubmit(formData)) closeDialog();
        else { 
            alert('failed')
        }
    }

    return <>
        <DialogWrapper closeDialog={closeDialog}>
            <div>
                {inputs && inputs.map((x, ind) =>
                    <div key={ind}>
                        <FormInput {...x} formData={formData} setFormData={setFormData} submitForm={handleSubmit} />
                    </div>)
                }

                <div>
                    <input type="submit" onClick={handleSubmit} />
                </div>
            </div>
       </DialogWrapper>
    </>
}

//text, number, datetime
//select, radio, checkbox