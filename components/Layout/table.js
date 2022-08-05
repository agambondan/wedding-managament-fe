import Meta from "./meta";
import DataTable from "../Tables/data-table";
import {formatDate, formatSubString} from "../../utils/helper";
import {ImagePopUp} from "./pop-up";
import {ActionTable} from "../Tables/action-table";
import {useRouter} from "next/router";
import {H2} from "./text";
import {OptionQueryLimitOffset, SearchTable} from "./input";
import {AddButton} from "./button";
import {Pagination} from "./pagination";
import {useState} from "react";

export const Table = (props) => {
    const router = useRouter()
    const thClassName = "pl-3 pr-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
    const tdClassName = "px-5 py-3 border-b border-gray-200 bg-white text-sm text-center"
    const [options, setOptions] = useState(["5", "10", "15", "20", "25"])
    const queryLimit = router.query.limit === undefined ? "" : `&limit=${router.query.limit}`;
    return (
        <>
            <Meta title={props.title}/>
            <H2 label={props.label}/>
            <div className="my-0 sm:my-2 flex sm:flex-row flex-col">
                <div className="flex flex-row mb-1 sm:mb-0">
                    <OptionQueryLimitOffset basepath={router.pathname} options={options}/>
                </div>
                <SearchTable/>
                {props.customAddButton !== undefined ?
                    props.customAddButton
                    :
                    <AddButton href={props.href}/>
                }
            </div>
            {/*<div className="sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">*/}
            <div className="py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                        <tr>
                            <th className={`${thClassName}`}>No</th>
                            {props.columns.map((column, i) => {
                                return (
                                    <th key={i} className={`${thClassName}`}>{column}</th>
                                )
                            })}
                            {props.staticColumns.map((column, i) => {
                                return (
                                    <th key={i} className={`${thClassName} pl-10 pr-10`}>{column}</th>
                                )
                            })}
                        </tr>
                        </thead>
                        <tbody>
                        {props.rows.map((row, i) => {
                            return (
                                <tr key={i}>
                                    <td className={`${tdClassName} pl-3`}>{props.number + i + 1}</td>
                                    {props.columns.map((column) => {
                                        const objectKeys = Object.keys(row)
                                        let isContains = false
                                        for (let j = 0; j < objectKeys.length; j++) {
                                            if (objectKeys[j] === column) {
                                                isContains = true
                                                break;
                                            }
                                        }
                                        return (
                                            <>
                                                {isContains && !column.includes("image") ?
                                                    <td className={tdClassName}>{row[`${column}`]}</td> : <></>}
                                                {column.includes("image") ?
                                                    <td className="pl-1 pr-1 pt-3 pb-6 mx-1 border-b border-gray-200 bg-white text-sm text-center">
                                                        <div className="flex items-center align-center justify-center">
                                                            <div className="flex-shrink-0 w-20 h-10">
                                                                {row[column] === "" || row[column] === null ?
                                                                    <button className="pt-4 py-auto">Empty</button>
                                                                    :
                                                                    <button onClick={() => {
                                                                        ImagePopUp("image", row[`${column}`])
                                                                    }}>
                                                                        <img
                                                                            className="max-w-20 max-h-14 rounded border-none"
                                                                            src={row[`${column}`]}
                                                                            alt={"image"}/>
                                                                    </button>
                                                                }
                                                            </div>
                                                        </div>
                                                    </td>
                                                    :
                                                    <></>
                                                }
                                            </>
                                        )
                                    })}
                                    <td className={tdClassName}>{formatDate(row.created_at)}</td>
                                    {props.staticColumns[1] === "action" ?
                                        <ActionTable basepath={`${router.pathname}/${props.label}`} name={row[props.columns[0]]}
                                                     delete={props.handleDelete} id={row.id}/>
                                        :
                                        <></>
                                    }
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
            <br/>
            <Pagination pathname={`${router.pathname}`} limit={queryLimit} page={props.page} lastPage={props.lastPage}/>
        </>
    )
}

export default Table