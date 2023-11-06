import TableItem from "./TableItem";

export default class MyTable<T extends TableItem>  { 
    items: T[] = [];

    add(item: T): boolean {
        item.id = this.getNewId();
        this.items.push(item);

        return true;
    }

    remove (id: number): boolean { 
        if (!this.checkId(id)) return false;

        this.items = this.items.filter(x => x.id !== id);
        return true;
    }

    update(item: T): boolean { 
        if (!this.checkId(item.id)) return false;

        this.items = this.items.map(x => x.id  === item.id ? item : x);
        return true;
    }

    find (id: number) : T | undefined { 
        return this.items.find(x => x.id === id);
    }

    getList () : T[] {
        return this.items;
    }

    getNewId(): number { 
        if (this.items && !this.items.length) return 1;
        return this.items.map(x => x.id).reduce((res, curr) => Math.max(res, curr)) + 1;
    }

    checkId(id: number): boolean { 
        return this.items.some(x => x.id === id);
    }

    copyData(newItem: MyTable<T>) { 
        this.items = [...newItem.items]
    }
}