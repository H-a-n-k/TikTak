
const ToDMYFormat = (date: Date): string => { 
    var ymd = date.toString().split('T')[0];
    var dmy = ymd.split('-').reverse().join('/');

    return dmy
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

export {ToDMYFormat, addDays, resetTime}