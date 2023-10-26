import { useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext"
import { ToDMYFormat, ToYMDFormat } from "../utils/datetime";
import DataTable from "../components/shared/DataTable";
import AddEditForm from "../components/shared/AddEditForm";
import { FormInputType } from "../components/shared/FormInput";
import { DeleteIcon, EditIcon } from "../utils/icons";
import Task from "../models/Task";
import TaskService from "../services/task";
import ConfirmDialog from "../components/shared/ConfirmDialog";

const HomePage = () => { 
    const { dbo } = useGlobalContext();
    
    enum Mode {
        List, Add, Edit, Delete
    }
    const { addTask, getListTask, updateTask, deleteTask } = TaskService(dbo);
    const data = getListTask();
    
    //data table
    const columns = [
        {
            title: 'ID',
            key: 'id'
        },
        {
            title: 'Name',
            key: 'name'
        },
        {
            title: 'Content',
            key: 'content'
        },
        {
            title: 'Reward',
            key: 'reward'
        },
        {
            title: 'Penalty',
            key: 'penalty'
        },
        {
            title: 'Begin',
            key: 'begin'
        },
        {
            title: 'Deadline',
            key: 'deadline'
        },
    ]
    const actions = [
        {
            icon: <EditIcon />,
            action: (x: Task) => {
                setSelectedItem(x);
                setMode(Mode.Edit)
            }
        },
        {
            icon: <DeleteIcon />,
            action: (x: Task) => {
                setSelectedItem(x)
                setMode(Mode.Delete)
            }
        }
    ]

    //add form
    const inputsAdd = [
        {
            type: FormInputType.text,
            name: "name",
            label: "Name",
            //autoFocus: true
        },
        {
            type: FormInputType.text,
            name: "content",
            label: "content"
        },
        {
            type: FormInputType.number,
            name: "reward",
            label: "reward"
        },
        {
            type: FormInputType.number,
            name: "penalty",
            label: "penalty"
        },
        {
            type: FormInputType.date,
            name: "begin",
            label: "begin"
        },
        {
            type: FormInputType.date,
            name: "deadline",
            label: "deadline"
        },
    ]

    const inputsEdit = [
        {
            type: FormInputType.number,
            name: "id",
            label: "id"
        },
        ...inputsAdd,
    ]

    const [selectedItem, setSelectedItem] = useState<Task>(new Task())
    const [mode, setMode] = useState(Mode.List);

    const onAdd = (item: Task): boolean => addTask(item)

    const onEdit = (item: Task): boolean => updateTask(item)

    const onDelete = (): boolean => { 
        if (!selectedItem) return false;
        const flag = deleteTask(selectedItem.id);
        return flag;
    }

    const closeDialog = () => { 
        setMode(Mode.List);
        setSelectedItem(new Task())
    }
   
    return <>
        <h1>{dbo.config.appName}</h1>
        <h2>{ToDMYFormat(dbo.config.lastUpdate)}</h2>
        <div>
            <button onClick={() => setMode(Mode.Add)}>
                Add Task
            </button>
        </div>

        {data && <DataTable dataSource={data} columns={columns} actions={actions} />}

        {mode === Mode.Add && <>
            <AddEditForm<Task> object={selectedItem} inputs={inputsAdd} closeDialog={closeDialog} onSubmit={onAdd} />
        </>}

        {mode === Mode.Edit && <>
            <AddEditForm<Task> object={selectedItem} inputs={inputsEdit} closeDialog={closeDialog} onSubmit={onEdit} />
        </>}

        {mode === Mode.Delete && <>
            <ConfirmDialog onConfirm={onDelete} closeDialog={closeDialog} message={`delete task ${selectedItem?.name}?`} />
        </>}
    </>
}

export default HomePage