import TableItem from "./TableItem";

export default interface User extends TableItem { 
    name: string,
    point: number, //comsumable
    score: number //record purpose
}