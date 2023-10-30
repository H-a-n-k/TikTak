import GeneralObject from "../../models/GeneralObject"
import { ReverseDMY } from '../../utils/datetime'

export interface TableColumn {
    title: string,
    key: string,
    processor?: (i: any) => any
}

export interface TableAction<T> {
    icon: JSX.Element,
    action: (item: T) => void
}

export interface Props<T> { 
    dataSource: T[],
    columns: TableColumn[],
    actions?: TableAction<T>[]
}

export const DataProcessor = {
    numberProcessor: (i: number): number => {
        if (isNaN(i)) return 0;

        return i;
    },

    dateProcessor: (i: string): string => { 
        return ReverseDMY(i);
    }
}

export default function DataTable<T extends GeneralObject>({ dataSource, columns, actions }: Props<T>) {
 
    const getData = (obj: T, key: string, processor?: (i: any) => any): any => {
        var val = obj[key] === undefined ? '#' : obj[key]
        if (processor) val = processor(val);
        return val
    }

    return <div className="table-basic">
        {(columns && columns.length && dataSource && dataSource.length) ?
            <table>
                <thead>
                    <tr>
                        {columns.map(x => <>
                            <th key={x.key}>
                                {x.title}
                            </th>
                        </>)}
                        {actions && <th></th>}
                    </tr>
                </thead>

                <tbody>
                    {dataSource.map((obj, ind) => <>
                        <tr key={'r-' + ind}>
                            {columns.map(col => <>
                                <td key={ind + '-' + col.key}>
                                    {getData(obj, col.key, col.processor)}
                                </td>
                            </>)}

                            <td>
                                {actions && actions.map((action, ind) => <a key={'a-' + ind} onClick={() => { action.action(obj) }}>
                                    {action.icon}
                                </a>)}
                            </td>
                        </tr>
                    </>)}
                </tbody>
            </table>
            :
            <h3>
                no data
            </h3>
        }
    </div>
}
