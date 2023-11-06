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

export const getListSubTask = (dbo: Dbo, id: number): Task[] => { 
    return dbo.tbTask.getList().filter(x => x.superTaskID === id);
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

export const getListTaskDTO = (dbo: Dbo): TaskDTO[] => {
    const dataRaw: Task[] = dbo.tbTask.items;
    const data: TaskDTO[] = dataRaw.map(x => new TaskDTO(x, dbo));

    return data;
};

export const getListTaskOfCate = (dbo: Dbo, cateID: number): Task[] => {
    const dataRaw: Task[] = dbo.tbTask.items;
    const data: Task[] = dataRaw.filter(x => x.categoryID === cateID);

    return data;
};