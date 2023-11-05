import { useState, useMemo } from "react";
import { useGlobalContext } from "../../contexts/GlobalContext"
import DataTable, { TableAction, TableColumn } from "../../components/shared/DataTable";
import AddEditForm from "../../components/shared/AddEditForm";
import { FormInputInfo, FormInputType } from "../../components/shared/FormInput";
import { DeleteIcon, EditIcon } from "../../utils/icons";
import ConfirmDialog from "../../components/shared/ConfirmDialog";
import TableItem from "../../models/TableItem";
import { Dbo } from "../../data/dbo";
import GeneralObject from "../../models/GeneralObject";

enum Mode {
    List, Add, Edit, Delete
}

export interface CRUDtemplateProps<T> { 
    title: string, TableColumns: TableColumn[],
    getData: (dbo: Dbo) => T[],
    inputsAdd: FormInputInfo[], inputsEdit?: FormInputInfo[],
    addService: (dbo: Dbo, item: T) => boolean,
    editService: (dbo: Dbo, item: T) => boolean,
    deleteService: (dbo: Dbo, id: number) => boolean
}

export default function CRUDtemplate<T extends TableItem>(
    { title, TableColumns, getData, inputsAdd, inputsEdit, addService, editService, deleteService }: CRUDtemplateProps<T>
) {

    if (!inputsEdit) inputsEdit = [...inputsAdd]
    inputsEdit = [
        {
            type: FormInputType.number,
            name: "id",
            label: "id",
            hidden: true
        },
        ...inputsEdit,
    ]

    const { dbo } = useGlobalContext();

    const [selectedItem, setSelectedItem] = useState<T | null>(null)
    const [mode, setMode] = useState<Mode>(Mode.List);
    const [refresh, setRefresh] = useState<boolean>(false);

    const data: T[] = useMemo(() => {
        return getData(dbo);
        // eslint-disable-next-line
    }, [refresh, dbo, getData]);

    const columns: TableColumn[] = TableColumns;
    const actions: TableAction<T>[] = useMemo(
        () => [
            {
                icon: <EditIcon />,
                action: (x: T) => {
                    setSelectedItem(x);
                    setMode(Mode.Edit)
                }
            },
            {
                icon: <DeleteIcon />,
                action: (x: T) => {
                    setSelectedItem(x)
                    setMode(Mode.Delete)
                }
            }
        ]
        , [setSelectedItem, setMode]
    )

    const onAdd = (item: GeneralObject): boolean => {
        const flag = addService(dbo, item as T)
        if (flag) setRefresh(x => !x);
        return flag;
    }

    const onEdit = (item: T): boolean => {
        const flag = editService(dbo, item)
        if (flag) setRefresh(x => !x);
        return flag;
    }

    const onDelete = (): boolean => {
        if (!selectedItem) return false;
        const flag = deleteService(dbo, selectedItem.id);
        if (flag) setRefresh(x => !x);
        return flag;
    }

    const closeDialog = () => {
        setMode(Mode.List);
        setSelectedItem(null)
    }

    return <>
        <h2>{title}</h2>
        <hr />
        <div>
            <button onClick={() => setMode(Mode.Add)}>
                Add
            </button>
        </div>

        {data && <DataTable dataSource={data} columns={columns} actions={actions} />}

        {mode === Mode.Add && !selectedItem && <>
            <AddEditForm<GeneralObject> object={{}} inputs={inputsAdd} closeDialog={closeDialog} onSubmit={onAdd} />
        </>}

        {mode === Mode.Edit && selectedItem && <>
            <AddEditForm<T> object={selectedItem} inputs={inputsEdit} closeDialog={closeDialog} onSubmit={onEdit} />
        </>}

        {mode === Mode.Delete && <>
            <ConfirmDialog onConfirm={onDelete} closeDialog={closeDialog} message={`delete item #${selectedItem?.id}?`} />
        </>}
    </>
}
