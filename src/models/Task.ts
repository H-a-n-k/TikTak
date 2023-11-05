import { ToYMDFormat, getDateEnd, getDateStart } from "../utils/datetime";
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
    disable = 'Disable'
}

export default class Task implements TableItem { 
    //normal task
    id: number = -1;
    name?: string;
    content?: string;
    reward?: number = 0;
    penalty?: number;
    user?: Nullable<User>;
    begin?: string;
    deadline?: string;
    state?: TaskState = TaskState.new;
    
    categoryID?: number = -1;

    //repeat
    cycleArr?: number[];
    cycleTime?: TimeSpan;
    cycleEnd?: Date;

    //sub task
    target?: number;

    //super task
    superTaskID?: number;
    required?: boolean;

    constructor(
        name?: string, content?: string,
        reward?: number, penalty?: number, user?: Nullable<User>,
        begin?: string, deadline?: string, categoryID?: number, 
        cycleArr?: number[], cycleTime?: TimeSpan, cycleEnd?: Date,
        target?: number,
        superTaskID?: number,
        required?: boolean,
    )
    { 
        this.name = name || '';
        this.content = content || '';
        this.reward = reward || 0;
        this.penalty = penalty || 0;
        this.begin = begin || ToYMDFormat(getDateStart(new Date(Date.now())));
        this.deadline = deadline || ToYMDFormat(getDateEnd(new Date(Date.now())));
        this.categoryID = categoryID;
        this.user = user;
        this.cycleArr = cycleArr;
        this.cycleTime = cycleTime;
        this.cycleEnd = cycleEnd;
        this.target = target;
        this.superTaskID = superTaskID;
        this.required = required;
    }
}