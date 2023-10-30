import CRUDtemplate from "../components/shared/CRUDtemplate";
import { TableColumn } from "../components/shared/DataTable";
import { FormInputInfo, FormInputType } from "../components/shared/FormInput";
import Category from "../models/Category";
import { addCate, deleteCate, getListCate, updateCate } from "../services/category";

const columns: TableColumn[] = [
    {
        title: 'Name',
        key: 'name'
    }
]

const inputsAdd: FormInputInfo[] = [
    {
        type: FormInputType.text,
        label: 'Name',
        name: 'name'
    }
]

export default function CatePage () { 
    

    return <CRUDtemplate<Category>
        title="Category" TableColumns={columns} getData={getListCate}
        inputsAdd={inputsAdd}
        addService={addCate} editService={updateCate} deleteService={deleteCate}
    />
}