import { DataProcessor, TableColumn } from "../components/shared/DataTable";
import { FormInputInfo, FormInputType } from "../components/shared/FormInput";
import Task from "../models/Task";
import { addTask, deleteTask, getListTask, updateTask } from "../services/task";
import CRUDtemplate from "../components/shared/CRUDtemplate";

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

const TaskPage = () => {
    
    return <CRUDtemplate<Task>
        title="Task" TableColumns={TableColumns} getData={getListTask}
        inputsAdd={inputsAdd}
        addService={addTask} editService={updateTask} deleteService={deleteTask}
    />
}

export default TaskPage