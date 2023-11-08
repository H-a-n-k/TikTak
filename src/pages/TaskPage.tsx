import { useMemo, useState } from 'react'
import { DataProcessor, TableColumn } from "../components/shared/DataTable";
import { FormInputGenerator, FormInputInfo, FormInputType, SelectOpt } from "../components/shared/FormInput";
import Task from "../models/Task";
import { addTask, deleteTask, getListSubTask, getListTask, getListTaskDTO, updateTask } from "../services/task";
import CRUDtemplate from "../components/shared/CRUDtemplate";
import { getListCate } from '../services/category';
import { useGlobalContext } from '../contexts/GlobalContext';
import GeneralObject from '../models/GeneralObject';
import SchedulePicker from '../components/task/SchedulePicker';
import { Dbo } from '../data/dbo';

const TableColumns: TableColumn[] = [
    {
        title: 'ID',
        key: 'id'
    },
    {
        title: 'LV',
        key: 'level'
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

    const SelectSuperTask: FormInputGenerator = useMemo(() => { 
        return {
            generator: (formData: any, setFormData: React.Dispatch<any>) => {
                const currTaskId = formData['id'];

                var excludeList: number[] = getListSubTask(dbo, currTaskId, true).map(x => x.id);
                const superTasks = getListTask(dbo);
                const opts = superTasks.filter(x => x.id !== currTaskId && (!x.superTaskID || !excludeList.includes(x.id)))

                const t = "superTaskID"
                return <>
                    <label htmlFor={t}>Super Task</label>
                    <select name={t} id={t} value={formData[t]} onChange={(e) => { setFormData({ ...formData, [t]: parseInt(e.target.value) }) }}>
                        <option value="-1">None</option>
                        {opts.map(x => <option key={x.id} value={x.id}>
                            {x.name}
                        </option>)}
                    </select>
                </>
            }
        }
        // eslint-disable-next-line
    }, [dbo, refresh])

    const CycleTask: FormInputGenerator = useMemo(() => { 
        return {
            generator: (formData: any, setFormData: React.Dispatch<any>) => {

                return <>
                    <SchedulePicker formData={formData} setFormData={setFormData} />
                </>
            }
        }
    }, [])

    const inpsAdd: (FormInputInfo | FormInputGenerator)[] = useMemo(() => { 
        return [...inputsAdd,
        { type: FormInputType.selectNumber, label: 'Category', name: 'categoryID', options: cates } as FormInputInfo,
            SelectSuperTask,
        {
            type: FormInputType.checkbox,
            name: "isRepeated",
            label: "Repeat"
        },
            CycleTask,
        ]

    }, [cates, CycleTask, SelectSuperTask])

    const checkBeforeAddEdit = (item: Task): boolean => {
        if (!item.name) return false;
        if (item.cycleArr) { 
            item.cycleArr.sort()
        }

        return true;
    }

    const onAdd = (dbo: Dbo, item: Task): boolean => { 
        if (!checkBeforeAddEdit(item)) return false;

        return addTask(dbo, item)
    }

    const onEdit = (dbo: Dbo, item: Task): boolean => {
        if (!checkBeforeAddEdit(item)) return false;

        return updateTask(dbo, item)
    }
    
    return <div className='task-page'>
        <CRUDtemplate<Task>
            title="Task" TableColumns={TableColumns} data={data}
            inputsAdd={inpsAdd} setRefresh={setRefresh}
            addService={onAdd} editService={onEdit} deleteService={deleteTask}
        />
    </div>
}

export default TaskPage