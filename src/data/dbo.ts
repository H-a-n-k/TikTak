import Category from "../models/Category";
import Log from "../models/Log";
import MyTable from "../models/MyTable";
import Task from "../models/Task";
import User from "../models/User";

interface Config { 
    appName: string,
    lastUpdate: Date
}

export interface Dbo { 
    tbCategory: MyTable<Category>,
    tbUser: MyTable<User>,
    tbTask: MyTable<Task>,
    tbLog: MyTable<Log>,
    config: Config
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
        }
    }
}