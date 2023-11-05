import { useMemo } from 'react'
import { DataProcessor, TableColumn } from "../components/shared/DataTable";
import { FormInputInfo, FormInputType, SelectOpt } from "../components/shared/FormInput";
import Task from "../models/Task";
import { addTask, deleteTask, getListTask, updateTask } from "../services/task";
import CRUDtemplate from "../components/shared/CRUDtemplate";
import { getListCate } from '../services/category';
import { useGlobalContext } from '../contexts/GlobalContext';
import TaskDTO from '../dto/TaskDTO';
import GeneralObject from '../models/GeneralObject';

const TableColumns: TableColumn[] = [
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
        key: 'reward',
        processor: DataProcessor.numberProcessor
    },
    {
        title: 'Penalty',
        key: 'penalty',
        processor: DataProcessor.numberProcessor
    },
    {
        title: 'Begin',
        key: 'begin',
        processor: DataProcessor.dateProcessor
    },
    {
        title: 'Deadline',
        key: 'deadline',
        processor: DataProcessor.dateProcessor
    },
    {
        title: 'Category',
        key: 'category',
        processor: (obj: GeneralObject) => { 
            return obj['name']
        }
    },
]

//add form
const inputsAdd: FormInputInfo[] = [
    {
        type: FormInputType.text,
        name: "name",
        label: "Name",
        autoFocus: true
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
        type: FormInputType.datetime,
        name: "begin",
        label: "begin"
    },
    {
        type: FormInputType.datetime,
        name: "deadline",
        label: "deadline"
    },
]

const TaskPage = () => {
    const { dbo } = useGlobalContext();

    const cates: SelectOpt[] = useMemo(() => { 
        const categories = getListCate(dbo);
        const res: SelectOpt[] = categories.map(x => { return { display: x.name, val: x.id + '' } as SelectOpt });
        return res;
    }, [dbo])

    const inpsAdd = [...inputsAdd, { type: FormInputType.select, label: 'Category', name: 'categoryID', options: cates } as FormInputInfo]
    
    return <CRUDtemplate<Task>
        title="Task" TableColumns={TableColumns} getData={getListTask}
        inputsAdd={inpsAdd}
        addService={addTask} editService={updateTask} deleteService={deleteTask}
    />
}

export default TaskPage