import { useMemo } from "react"
import TaskDTO, { TaskDTOCols } from "../../dto/TaskDTO"

interface Props { 
    formData: any,
    setFormData: React.Dispatch<React.SetStateAction<any>>
}

export default function SubTaskEdit({ formData, setFormData }: Props) { 
    
    const subTasks: TaskDTO[] = useMemo(() => { 
        return formData[TaskDTOCols.subTasks]
        // eslint-disable-next-line
    }, [])

    const onChange = (obj: TaskDTO) => { 
        var currSubTasks: TaskDTO[] = formData[TaskDTOCols.subTasks]
        if (isChecked(obj)) {
            currSubTasks = currSubTasks.filter(x => x.id !== obj.id);
        } else { 
            currSubTasks.push(obj)
        }

        setFormData({ ...formData, [TaskDTOCols.subTasks]: currSubTasks})
    }

    const isChecked = (obj: TaskDTO): boolean => { 
        const currSubTasks: TaskDTO[] = formData[TaskDTOCols.subTasks]
        return currSubTasks.find(x => x.id === obj.id) !== undefined
    }

    return <div className="edit-subtask">
        <p>Subtasks: </p>
        <div className="subtasks">
            {subTasks.map((x, ind) => 
                <div className="subtask" key={ind}>
                    <input type="checkbox" id={"subtask-" + ind} checked={isChecked(x)} onChange={() => onChange(x)} />
                    <label htmlFor={"subtask-" + ind}>{x.name}</label>
                </div>
            )}
        </div>
    </div>
}