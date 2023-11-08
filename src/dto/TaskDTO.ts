import { Dbo } from '../data/dbo'
import Category from '../models/Category'
import Task, { TaskState } from '../models/Task'
import { findCate } from '../services/category'
import { findTask, getListSubTask } from '../services/task'

export default class TaskDTO extends Task { 
    
    category?: Category

    subTasks?: TaskDTO[]
    noCompleted?: number = 0
    noRequired?: number = 0

    superTask?: Task

    constructor(t: Task, dbo?: Dbo) { 
        super(t.name, t.content, t.reward,
            t.penalty, t.user, t.begin, t.deadline,
            t.categoryID, t.isRepeated, t.scheduleType, t.noCycle, t.cycleArr, t.cycleTime, t.cycleEnd,
            t.target, t.superTaskID, t.required
        );
        this.id = t.id;

        if(dbo) this.include(dbo);
    }

    include = (dbo: Dbo, recur: boolean = true): void => {
        if (this.categoryID && this.categoryID > 0) { 
            this.category = findCate(dbo, this.categoryID);
        }
        this.subTasks = getListSubTask(dbo, this.id).map(x => new TaskDTO(x));
        this.noRequired = this.subTasks.filter(x => x.required).length;
        this.noCompleted = this.subTasks.filter(x => x.state === TaskState.finished).length;
        if (this.superTaskID) this.superTask = findTask(dbo, this.superTaskID);

        if (recur) { 
            this.subTasks.forEach(x => x.include(dbo, false));
        }
    }
}