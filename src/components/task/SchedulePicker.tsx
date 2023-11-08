import { useEffect, useMemo } from "react";
import { ToYMDFormat, addDays, addMonths, getDateStart } from "../../utils/datetime";
import { ScheduleType, TaskCols } from "../../models/Task";

interface ScheduleItem { 
    label: string,
    value: string
}

const getDays = (begin: Date, noDay: number): ScheduleItem[] => {
    var res: ScheduleItem[] = []

    for (var i = 0; i < noDay; i++) {
        var currDay = addDays(begin, i);
        res.push({ label: currDay.getDate() + '', value: ToYMDFormat(currDay) })
    }

    return res;
}

//T2 -> 1, T3 -> 2, ...CN -> 7
const getDay = (d: Date): number => { 
    return d.getDay() === 0? 7: d.getDay()
}

const getWeeks = (begin: Date, noWeek: number): ScheduleItem[] => { 
    var res: ScheduleItem[] = []

    //start from monday
    var currDay = addDays(begin, -getDay(begin) + 1);

    for (var i = 0; i < noWeek; i++) { 
        for (var j = 1; j <= 7; j++) { 
            res.push(
                {
                    label: currDay.getDay() === 0 ? 'CN' : 'T' + (currDay.getDay() + 1),
                    //if currDay < today, get next week
                    value: getDay(currDay) < getDay(begin) ? ToYMDFormat(addDays(currDay, 7)) : ToYMDFormat(currDay)
                }
            )

            currDay = addDays(currDay, 1)
        }
    }

    return res;
}

const getMonth = (begin: Date, noMonth: number): ScheduleItem[] => {
    var res: ScheduleItem[] = []

    while (begin.getDate() > 28) begin = addDays(begin, 1);
    var currDay = addDays(begin, -begin.getDate() + 1)

    for (var i = 0; i < noMonth; i++) {
        for (var j = 1; j <= 28; j++){
            res.push(
                {
                    label: '' + currDay.getDate(),
                    value: currDay.getDate() < begin.getDate() ? ToYMDFormat(addMonths(currDay, 1)) : ToYMDFormat(currDay)
                }
            )

            currDay = addDays(currDay, 1);
        }

        while (currDay.getDate() > 28) currDay = addDays(currDay, 1);
    }

    return res;
}

interface Props {
    formData: any,
    setFormData: React.Dispatch<React.SetStateAction<any>>
}

export default function SchedulePicker({ formData, setFormData }: Props) { 
    
    const name: string = TaskCols.cycleArr

    const active = formData[TaskCols.isRepeated];

    //reset array everytime type change
    // useEffect(() => { 
    //     setFormData({ ...formData, [name]: [] })
    //     // eslint-disable-next-line
    // }, [formData[TaskCols.scheduleType]])

    useEffect(() => {
        if (!active) {
            setFormData({ ...formData, [name]: [], [TaskCols.noCycle]: 1, [TaskCols.scheduleType]: ScheduleType.Day })
        }
        // eslint-disable-next-line
    }, [active])

    var items: ScheduleItem[] = useMemo(() => {
        if (!active) return [];

        var type: string = formData[TaskCols.scheduleType]
        var begin: string = formData[TaskCols.begin]
        var beginDate = begin ? new Date(begin) : getDateStart(new Date(Date.now()))
        var count: number = formData[TaskCols.noCycle] || 1

        switch (type) {
            case ScheduleType.Day:
                return getDays(beginDate, count)
            case ScheduleType.Week:
                return getWeeks(beginDate, count);
            case ScheduleType.Month:
                return getMonth(beginDate, count);
            default: return []
        }

    }, [formData, active])

    if (!active) { 
        //reset data
        //setFormData({...formData, [name]: []})

        return <></>
    }

    const onArrChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        var val: string = e.target.value;
        var object: string[] = formData[name];
        if (!object) { 
            setFormData({ ...formData, [name]: [] })
            object = [];
        }

        if (object.includes(val)) object = object.filter(x => x !== val)
        else object.push(val)

        setFormData({ ...formData, [name]: object })
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { 
        const { name, value } = e.target;
        setFormData({...formData, [name]: value})
    }

    return <div className="schedule-picker">
        <p>Repeat every: </p>
        <div>
            <select name={TaskCols.scheduleType} id={TaskCols.scheduleType} value={formData[TaskCols.scheduleType]} onChange={onChange}>
                <option value={ScheduleType.Day}>Day</option>
                <option value={ScheduleType.Week}>Week</option>
                <option value={ScheduleType.Month}>Month</option>
            </select>
        </div>

        <div>
            <input type="number" name={TaskCols.noCycle} id={TaskCols.noCycle} value={formData[TaskCols.noCycle]} onChange={onChange} />
            <label htmlFor={TaskCols.noCycle}></label>
        </div>
    
        <p>pick schedule: </p>
        <div className="schedule-items">
            {items.map(x => <div key={name + '-' + x.value} className="schedule-item">
                <input type="checkbox" name={name} id={name + '-' + x.value} value={x.value} checked={formData[name]?.includes(x.value)} onChange={onArrChange} />
                <label htmlFor={name + '-' + x.value}>{x.label}</label>
            </div>)}
        </div>
    </div>
}