import { Dbo } from "../data/dbo";
import Task from "../models/Task";

export const addTask = (dbo: Dbo, item: Task): boolean => {
    const flag = dbo.tbTask.add(item);
    if (flag) dbo.saveChanges();
    return flag;
}

export const getListTask = (dbo: Dbo): Task[] => {
    const data = dbo.tbTask.items;

    return data;
};

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
