
const ToDMYFormat = (date: Date): string => { 
    if (!date) return '';
    var ymd = date.toISOString().split('T')[0];
    var dmy = ymd.split('-').reverse().join('-');

    return dmy
}

const ToYMDFormat = (_date: Date): string => {
    if (!_date) return '';
    var date = new Date(_date)

    date.setHours(date.getHours() - (date.getTimezoneOffset() / 60))
    var ymd = date.toISOString().split('.')[0];

    return ymd
}

const DisplayDate = (date: string) => { 
    var d: string = date.split('T')[0];
    var t: string = date.split('T')[1] || '';

    var rv = d.split('-').reverse().join('-') + ' ' + t;
    return rv
}

function addDays(date: Date, days: number): Date {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function addMonths(date: Date, months: number): Date {
    var result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
}

function getDateStart(date: Date): Date { 
    var newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
}

function getDateEnd(date: Date): Date {
    var newDate = new Date(date);
    newDate.setHours(23, 59, 59, 0);
    return newDate;
}

export { ToDMYFormat, ToYMDFormat, DisplayDate, addDays, addMonths, getDateStart, getDateEnd }