import TableItem from "./TableItem";

export default class Category implements TableItem { 
    id: number = -1;
    name?: string = ''

    constructor(name?: string) { 
        this.name = name;
    }
}