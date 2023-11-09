import { useMemo, useState } from 'react'
import { DataProcessor, TableColumn } from "../components/shared/DataTable";
import { FormInputGenerator, FormInputInfo, FormInputType, SelectOpt } from "../components/shared/FormInput";
import Task from "../models/Task";
import { addTask, deleteTask, getListSubTask, getListTask, getListTaskDTO, updateSubTasks, updateTask } from "../services/task";
import CRUDtemplate from "../components/shared/CRUDtemplate";
import { getListCate } from '../services/category';
import { useGlobalContext } from '../contexts/GlobalContext';
import GeneralObject from '../models/GeneralObject';
import SchedulePicker from '../components/task/SchedulePicker';
import { Dbo } from '../data/dbo';
import { ToYMDFormat, getDateEnd, getDateStart } from '../utils/datetime';
import SubTaskEdit from '../components/task/SubTasksEdit';
import TaskDTO from '../dto/TaskDTO';
import DetailDialog from '../components/task/DetailDialog';

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

const defaultObject: Task = {
    id: -1,
    reward: 0,
    penalty: 0,
    begin: ToYMDFormat(getDateStart()),
    deadline: ToYMDFormat(getDateEnd()),
}

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

    const EditSubTasks: FormInputGenerator = useMemo(() => {
        return {
            generator: (formData: any, setFormData: React.Dispatch<any>) => {

                return <>
                    <SubTaskEdit formData={formData} setFormData={setFormData} />
                </>
            }
        }
    }, [])

    const inpsEdit: (FormInputInfo | FormInputGenerator)[] = useMemo(() => {
        return [...inpsAdd,
            EditSubTasks
        ]

    }, [EditSubTasks, inpsAdd])

    const checkBeforeAddEdit = (item: Task): boolean => {
        const { name, reward, penalty, begin, deadline, noCycle} = item
        if (!name) return false;
        if (reward === undefined || reward < 0) return false;
        if (penalty === undefined || penalty < 0) return false;
        if (begin && deadline && new Date(begin) >= new Date(deadline)) return false;
        if (noCycle && noCycle < 1) return false;

        if (item.cycleArr) { 
            item.cycleArr.sort()
        }

        return true;
    }

    //add form vallidation
    const onAdd = (dbo: Dbo, item: TaskDTO): boolean => { 
        if (!checkBeforeAddEdit(item)) {
            return false;
        }
        const { begin } = item;
        if (begin && new Date(begin) < getDateStart()) return false;

        return addTask(dbo, item)
    }

    //edit add form vallidation
    const onEdit = (dbo: Dbo, item: TaskDTO): boolean => {
        if (!checkBeforeAddEdit(item)) {
            return false;
        }

        //update subtasks
        if (!updateSubTasks(dbo, item)) {
            return false;
        }

        return updateTask(dbo, item)
    }
    
    return <div className='task-page'>
        <CRUDtemplate<TaskDTO>
            title="Task" TableColumns={TableColumns} data={data}
            defaultObject={defaultObject} inputsAdd={inpsAdd}
            createDetailDialog={(obj, closeDialog) => <DetailDialog object={obj} closeDialog={closeDialog} />} inputsEdit={inpsEdit} setRefresh={setRefresh}
            addService={onAdd} editService={onEdit} deleteService={deleteTask}
        />
    </div>
}

export default TaskPage