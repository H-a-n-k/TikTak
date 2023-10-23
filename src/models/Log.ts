import TableItem from "./TableItem";
import Task, { TaskState } from "./Task";

export default class Log implements TableItem { 
    id: number = -1;
    task: Task;
    oldState: TaskState;
    newState: TaskState;
    updatedBy?: 'user' | 'system' = 'system';
    time?: Date = new Date(Date.now());

    constructor(task: Task, oldState: TaskState, newState: TaskState)  { 
        this.task = task;
        this.oldState = oldState;
        this.newState = newState;
    }
}