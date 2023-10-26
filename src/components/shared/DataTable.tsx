import GeneralObject from "../../models/GeneralObject"
import { ToDMYFormat } from "../../utils/datetime"

interface Props<T> { 
    dataSource: T[],
    columns: {
        title: string,
        key: string
    }[],
    actions?: {
        icon: JSX.Element,
        action: (item: T) => void
    }[]
}

export default function DataTable<T extends GeneralObject>({ dataSource, columns, actions }: Props<T>) { 

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
                        <tr key={'r-'+ind}>
                            {columns.map(col => <>
                                <td key={ind + '-' + col.key}>
                                    {obj[col.key] === undefined ? '#': obj[col.key]}
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