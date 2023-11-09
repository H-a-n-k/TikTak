import { Dbo } from "../data/dbo";
import TaskDTO from "../dto/TaskDTO";
import Task from "../models/Task";

export const addTask = (dbo: Dbo, item: Task): boolean => {
    const flag = dbo.tbTask.add(item);
    if (flag) dbo.saveChanges();
    return flag;
}

export const getListTask = (dbo: Dbo): Task[] => {
    const dataRaw: Task[] = dbo.tbTask.items;

    return dataRaw;
};

export const findTask = (dbo: Dbo, id: number): Task | undefined => {
    return dbo.tbTask.find(id);
}

export const deleteTask = (dbo: Dbo, id: number): boolean => {
    const flag = dbo.tbTask.remove(id);
    if (flag) dbo.saveChanges();
    return flag;
};

export const updateTask = (dbo: Dbo, item: Task): boolean => {
    const flag = dbo.tbTask.update(item);
    if (flag) dbo.saveChanges();
    return flag;
};

type Level = {level: number}
type OrderedTaskDTO = TaskDTO & Level

export const getListTaskDTO = (dbo: Dbo): OrderedTaskDTO[] => {
    const dataRaw: Task[] = dbo.tbTask.items;
    if (dataRaw.length < 1) return [];
        
    //ordered list makes sure all subTask is right after its supertask
    const dataOrdered: Task[] = [];

    dataRaw.forEach(x => { //iterate data

        //skip all tasks with superTask, cause i'll add them later
        if (!x.superTaskID || x.superTaskID < 1) { 
            //if newData not include data, add data
            if (!dataOrdered.find(y => y.id === x.id)) {
                dataOrdered.push(x);

                //add all subTasks
                var subTasks: Task[] = getListSubTask(dbo, x.id, true);
                dataOrdered.push(...subTasks);
            }
        }
    })

    const data: OrderedTaskDTO[] = dataOrdered.map(x => new TaskDTO(x, dbo)).map(x => { return { ...x, level: 0 } });

    //assign level to all tasks
    //a list of possible super tasks' id, last element is prioritized
    var sup: [number] = [data[0].id];
    for (var i = 1; i < data.length; i++) { 
        var curr = data[i];

        //while superTask is last el in list, remove it
        while (curr.superTaskID !== sup[sup.length - 1] && sup.length > 0) sup.pop();

        //level of task is no el in list
        curr.level = sup.length;
        //curr task is the new most possible supertask in list
        sup.push(curr.id);
    }

    return data;
};

export const getListSubTask = (dbo: Dbo, id: number, recursive: boolean = false): Task[] => {

    var subTasks = dbo.tbTask.getList().filter(x => x.superTaskID === id);
    if (!recursive) return subTasks;
    
    //travel subtask tree dfs
    var res: Task[] = []
    subTasks.forEach(x => {
        res.push(x);

        var newSubTasks = getListSubTask(dbo, x.id, true);
        res.push(...newSubTasks);
    })

    return res;
}

export const getListTaskOfCate = (dbo: Dbo, cateID: number): Task[] => {
    const dataRaw: Task[] = dbo.tbTask.items;
    const data: Task[] = dataRaw.filter(x => x.categoryID === cateID);

    return data;
};

export const updateSubTasks = (dbo: Dbo, task: TaskDTO): boolean => { 
    const ids = task.subTasks?.map(x => x.id)//new subtask ids
    if (!ids) return true;

    const oldSubTasks = getListSubTask(dbo, task.id, false);
    if (ids.length === oldSubTasks.length) return true;

    oldSubTasks.forEach(x => { 
        if (!ids.includes(x.id)) { 
            //if new subtasks id not include this id, remove its supertask id
            x.superTaskID = undefined;
            if (!updateTask(dbo, x)) return false;
        }
    })

    return true;
}