import { Dbo } from "../data/dbo";
import Task from "../models/Task";

export default function TaskService(dbo: Dbo) {
    
    return {
        addTask: (item: Task): boolean => {
            const flag = dbo.tbTask.add(item);
            if (flag) dbo.saveChanges();
            return flag;
        },
        
        getListTask: (): Task[] => {
            const data = dbo.tbTask.items;

            return data;
        },
        
        deleteTask: (id: number): boolean => { 
            const flag = dbo.tbTask.remove(id);
            if (flag) dbo.saveChanges();
            return flag;
        },

        updateTask: (item: Task): boolean => {
            const flag = dbo.tbTask.update(item);
            if (flag) dbo.saveChanges();
            return flag;
        }
    }
    
}

// const editTask = (): boolean => {

// }

// const deleteTask = (): boolean => {

// }
