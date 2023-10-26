import Category from "../models/Category";
import Log from "../models/Log";
import MyTable from "../models/MyTable";
import Task from "../models/Task";
import User from "../models/User";

interface Config { 
    appName: string,
    lastUpdate: Date,
}

export interface Dbo { 
    tbCategory: MyTable<Category>,
    tbUser: MyTable<User>,
    tbTask: MyTable<Task>,
    tbLog: MyTable<Log>,
    config: Config,

    saveChanges: () => void
}

export function copyData(newItem: Dbo): Dbo { 
    const res = getDbo();
    res.tbCategory.copyData(newItem.tbCategory)
    res.tbTask.copyData(newItem.tbTask)
    res.tbLog.copyData(newItem.tbLog)
    res.tbUser.copyData(newItem.tbUser)

    return res;
}

export default function getDbo(): Dbo {

    return {
        tbCategory: new MyTable<Category>(),
        tbUser: new MyTable<User>(),
        tbTask: new MyTable<Task>(),
        tbLog: new MyTable<Log>(),
        config: {
            appName: 'TikTakApp',
            lastUpdate: new Date(Date.now())
        },

        saveChanges: function () { 
            localStorage.setItem('dbo', JSON.stringify(this));
        }
    }
}