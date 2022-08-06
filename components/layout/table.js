import Link from "next/link";
import {useRouter} from "next/router";
import {DeleteModal} from "./modal";
import Swal from "sweetalert2";
import axios from "axios";

export function Table(props) {
    const router = useRouter()
    const data = props.data
    let item = props.data[0]
    let keys = Object.keys(item).filter(function (element) {
        return !element.match("id")
    });
    let keysRemove = Object.keys(item).filter(function (element) {
        return element.match("id") || element === "action"
    });
    let ids = []
    data.forEach(object => {
        if (object.id !== undefined) {
            ids.push(object.id)
        }
        keysRemove.map((key) => {
            delete object[key]
        })
    });
    const handleDelete = (id) => {
        console.log(id)
        Swal.fire({
            title: `Do you want to delete this item?`,
            showCancelButton: true,
            confirmButtonText: `Yes`,
            showConfirmButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.update({
                        title: "Please Wait",
                        allowOutsideClick: false
                    }
                )
                Swal.showLoading()
                axios.delete(`${process.env.IP}/api/v1/master/cities/${id}/soft`, {
                    withCredentials: true
                }).then(res => {
                    Swal.fire({
                        title: "Delete Success",
                        timer: 5000
                    })
                    Swal.hideLoading()
                    setTimeout(() => {
                        router.push(router.pathname).then(r => {
                            console.log(r)
                        })
                        Swal.close()
                    }, 3000)
                }).catch(error => {
                    Swal.hideLoading()
                    Swal.fire({
                        title: `${error}`,
                        timer: 3000
                    })
                    setTimeout(() => {
                        Swal.close()
                    }, 3000)
                })
            }
        })
    }
    return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <div className="flex justify-between items-center px-4 pb-4">
                <div className="dark:bg-gray-900">
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative mt-1">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                 fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                      clipRule="evenodd"/>
                            </svg>
                        </div>
                        <input type="text" id="table-search"
                               className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="Search for items"/>
                    </div>
                </div>
                <div className="relative mt-1">
                    <Link href={"/admin/city/add"}>
                        <a className={"inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm dark:bg-gray-800 dark:text-white " +
                            "dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 px-4 py-3 mx-auto"}>
                            Add
                        </a>
                    </Link>
                </div>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead
                    className="text-xs text-gray-700 uppercase bg-gray-50 bg-gray-200 dark:bg-gray-900 dark:text-gray-400">
                <tr>
                    <th scope="col" className="p-4">
                        <div className="flex items-center">
                            <input id="checkbox-all-search" type="checkbox"
                                   className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                        </div>
                    </th>
                    {keys.map((key, index) => {
                        return (
                            key !== "id" ?
                                <th key={index} scope="col" className="text-center py-3 px-6">
                                    {(key.match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join(' ')}
                                </th> : <></>
                        )
                    })}
                    <th scope="col" className="py-3 px-6 text-center">
                        Action
                    </th>
                </tr>
                </thead>
                <tbody>
                {props.data.map((item, index) => {
                    return (
                        <tr key={index}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="p-4 w-4">
                                <div className="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox"
                                           className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label htmlFor="checkbox-table-search-1"
                                           className="sr-only">checkbox</label>
                                </div>
                            </td>
                            {keys.map((key, indexKey) => {
                                return (
                                    <th key={indexKey} scope="row" className="text-center py-4 px-6">
                                        {item[key]}
                                    </th>
                                )
                            })}
                            <th key={index} className="flex items-center justify-center py-4 px-6 space-x-3">
                                <Link href={`${router.pathname}/${ids[index]}`}>
                                    <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </Link>
                                <button className={"font-medium text-red-600 dark:text-red-500 hover:underline"}
                                        onClick={() => {
                                            handleDelete(ids[index])
                                        }}>
                                    Remove
                                </button>
                            </th>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}