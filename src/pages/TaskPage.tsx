import { useMemo, useState } from 'react'
import { DataProcessor, TableColumn } from "../components/shared/DataTable";
import { FormInputGenerator, FormInputInfo, FormInputType, SelectOpt } from "../components/shared/FormInput";
import Task from "../models/Task";
import { addTask, deleteTask, getListTask, getListTaskDTO, updateTask } from "../services/task";
import CRUDtemplate from "../components/shared/CRUDtemplate";
import { getListCate } from '../services/category';
import { useGlobalContext } from '../contexts/GlobalContext';
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
    {
        title: 'Super Task',
        key: 'superTask',
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
    const [refresh, setRefresh] = useState(false);

    const { dbo } = useGlobalContext();

    const data = useMemo(() => { 
        return getListTaskDTO(dbo);
        // eslint-disable-next-line
    }, [dbo, refresh])

    const cates: SelectOpt[] = useMemo(() => { 
        const categories = getListCate(dbo);
        const res: SelectOpt[] = categories.map(x => { return { display: x.name, val: x.id } as SelectOpt });

        return res;
        // eslint-disable-next-line
    }, [dbo, refresh])

    const superTasks: Task[] = useMemo(() => {
        const tasks = getListTask(dbo);

        return tasks;
        // eslint-disable-next-line
    }, [dbo, refresh])

    const SelectSuperTask: FormInputGenerator = {
        generator: (formData: any, setFormData: React.Dispatch<any>) => {
            const currTaskId = formData['id'];

            const opts = superTasks.filter(x => x.id !== currTaskId && x.superTaskID !== currTaskId)

            const t = "superTaskID"
            return <>
                <label htmlFor={t}>Super Task</label>
                <select name={t} id={t} title='chi vay ba?' value={formData[t]} onChange={(e) => { setFormData({ ...formData, [t]: parseInt(e.target.value) }) }}>
                    <option value="-1">None</option>
                    {opts.map(x => <option key={x.id} value={x.id}>
                        {x.name}
                    </option>)}
                </select>
            </>
        }
    }

    const inpsAdd: (FormInputInfo | FormInputGenerator)[] = [...inputsAdd,
        { type: FormInputType.selectNumber, label: 'Category', name: 'categoryID', options: cates } as FormInputInfo,
        SelectSuperTask
    ]
    
    return <CRUDtemplate<Task>
        title="Task" TableColumns={TableColumns} data={data}
        inputsAdd={inpsAdd} setRefresh={setRefresh}
        addService={addTask} editService={updateTask} deleteService={deleteTask}
    />
}

export default TaskPage