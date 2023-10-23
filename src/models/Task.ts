import Category from "./Category";
import { Nullable } from "./Nullable";
import TableItem from "./TableItem";
import User from "./User";

interface TimeSpan { 
    day: number,
    month: number
}

export enum TaskState {
    new = "New",
    progress = "Progress",
    finished = "Finished",
    late = "Late",
    failed = "Failed",
    deleted = 'deleted'
}

interface Repeat { 
    cycleArr: number[];
    cycleTime: TimeSpan | null;
    cycleEnd?: Date;
}
interface SubTasks { 
    subTasks: Task[];
    target: number;
}

interface SuperTask { 
    superTask: Task;
    required?: boolean;
}

export default class Task implements TableItem { 
    //normal task
    id: number = -1;
    name: string;
    content: string;
    reward: number;
    penalty: number;
    begin?: Date;
    deadline?: Nullable<Date>;
    state?: TaskState = TaskState.new;
    
    category?: Nullable<Category>;
    user?: Nullable<User>;

    repeat?: Nullable<Repeat>;
    subTasks?: Nullable<SubTasks>;
    superTask?: Nullable<SuperTask>;

    constructor(
        name: string, content: string,
        reward: number, penalty: number,
        begin?: Nullable<Date>, deadline?: Nullable<Date>,
        category?: Nullable<Category>, user?: Nullable<User>,
        repeat?: Nullable<Repeat>, subTasks?: Nullable<SubTasks>,
        superTask?: Nullable<SuperTask>
    )
    { 
        this.name = name;
        this.content = content;
        this.reward = reward;
        this.penalty = penalty;
        this.begin = begin || new Date(Date.now());
        this.deadline = deadline;
        this.category = category;
        this.user = user;
        this.repeat = repeat;
        this.subTasks = subTasks;
        this.superTask = superTask;
    }
}