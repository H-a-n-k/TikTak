import { useMemo, useState } from 'react'
import CRUDtemplate from "../components/shared/CRUDtemplate";
import { TableColumn } from "../components/shared/DataTable";
import { FormInputInfo, FormInputType } from "../components/shared/FormInput";
import Category from "../models/Category";
import { addCate, deleteCate, getListCate, updateCate } from "../services/category";
import { useGlobalContext } from '../contexts/GlobalContext';

const columns: TableColumn[] = [
    {
        title: 'ID',
        key: 'id'
    },
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
    const [refresh, setRefresh] = useState(false);

    const { dbo } = useGlobalContext();

    const data = useMemo(() => { 
        return getListCate(dbo)
        
        // eslint-disable-next-line
    }, [dbo, refresh])

    return <CRUDtemplate<Category>
        title="Category" TableColumns={columns} data={data}
        inputsAdd={inputsAdd} setRefresh={setRefresh}
        addService={addCate} editService={updateCate} deleteService={deleteCate}
    />
}