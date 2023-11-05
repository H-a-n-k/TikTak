import { Dbo } from "../data/dbo";
import Category from "../models/Category";

export const getListCate = (dbo: Dbo): Category[] => { 
    return dbo.tbCategory.getList()
}

export const findCate = (dbo: Dbo, id: number): Category | undefined => { 
    return dbo.tbCategory.find(id);
}

export const addCate = (dbo: Dbo, cate: Category): boolean => { 
    var flag: boolean = dbo.tbCategory.add(cate);
    if(flag) dbo.saveChanges();
    return flag;
}

export const updateCate = (dbo: Dbo, cate: Category): boolean => {
    var flag: boolean = dbo.tbCategory.update(cate);
    if(flag) dbo.saveChanges();
    return flag;
}

export const deleteCate = (dbo: Dbo, id: number): boolean => {
    var flag: boolean = dbo.tbCategory.remove(id);
    if(flag) dbo.saveChanges();
    return flag;
}