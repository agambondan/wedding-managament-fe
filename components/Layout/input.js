import {useRouter} from "next/router";
import React from "react";

export const InputText = (props) => {
    return (
        <input type="text" id={props.id} name={props.name} placeholder={props.placeholder}
               className={`${props.classname} p-3 placeholder-blueGray-300 text-blueGray-600 bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full`}
               value={props.value} onChange={(event) => {
            props.onChange(event)
        }}/>
    )
}

export const OptionQueryLimitOffset = (props) => {
    const router = useRouter()
    const handleOptions = (event) => {
        if (router.query.limit_topic !== undefined || router.query.limit_token !== undefined) {
            if (router.query.limit_topic === undefined) {
                router.query.limit_topic = 5
            }
            if (router.query.limit_token === undefined) {
                router.query.limit_token = 5
            }
            if (props.id === "token") {
                router.replace(`${props.basepath}?limit_topic=${router.query.limit_topic}&limit_token=${event.target.value}`)
                return
            } else if (props.id === "topic") {
                router.replace(`${props.basepath}?limit_topic=${event.target.value}&limit_token=${router.query.limit_token}`)
                return
            }
        }
        if (props.id === "topic") {
            router.replace(`${props.basepath}?limit_topic=${event.target.value}`)
        } else if (props.id === "token") {
            router.replace(`${props.basepath}?limit_token=${event.target.value}`)
        } else {
            router.replace(`${props.basepath}?limit=${event.target.value}`)
        }
    }
    return (
        <div className="relative">
            <select className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400
                                 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    value={router.query.limit} onChange={(e) => handleOptions(e)}>
                {props.options.map((value, index) => {
                    return (
                        <option key={index} value={value}>{value}</option>
                    )
                })}
            </select>
            <div
                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 20 20">
                    <path
                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
            </div>
        </div>
    )
}

export const SearchTable = () => {
    return (
        <div className="block relative">
                            <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                                    <path
                                        d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                                    </path>
                                </svg>
                            </span>
            <input placeholder="Search" type={"text"}
                   className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"/>
        </div>
    )
}

export const Search = (props) => {
    return (
        <>
            <div className={`block relative ${props.className}`}>
                            <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                                    <path
                                        d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                                    </path>
                                </svg>
                            </span>
                <input placeholder="Search" type="search" onChange={(event) => props.onChange(event)}
                       value={props.value}
                       className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"/>
            </div>
        </>
    )
}

export const SelectOptions = (props) => {
    return (
        <>
            <div className="relative">
                <select className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400
                                 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        onChange={(event) => {
                            props.onChange(event)
                        }} id={props.id} key={props.id}>
                    {props.options.map((value, index) => {
                        return (
                            <>
                                {(index === 0 ? <option key={props.defaultOption} className={"px-2"}
                                                        value={"Default-Value"}>Choose {props.defaultOption}</option> : <></>)}
                                <option key={index} value={value[`${props.optionValue}`]}>
                                    {value[`${props.optionValue}`]}
                                </option>
                            </>
                        )
                    })}
                </select>
                <div
                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 20 20">
                        <path
                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                </div>
            </div>
        </>
    )
}