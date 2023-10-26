
const ToDMYFormat = (date: Date): string => { 
    if (!date) return '';
    var ymd = date.toISOString().split('T')[0];
    var dmy = ymd.split('-').reverse().join('/');

    return dmy
}

const ToYMDFormat = (date: Date): string => {
    if (!date) return '';
    var ymd = date.toISOString().split('T')[0];

    return ymd
}

const ReverseDMY = (date: string) => { 
    var rv = date.split('-').reverse().join('-');
    return rv
}

function addDays(date: Date, days: number): Date {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function resetTime(date: Date): Date { 
    var newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
}

export { ToDMYFormat, ToYMDFormat, addDays, resetTime}