import Link from "next/link";
import {InputText} from "./input";
import Label from "./text";

export const FormGrid = (props) => {
    return (
        <div className="sm:mt-0">
            <div className="md:col-span-2">
                <form action="#" method="POST">
                    <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6">
                            <div className="grid grid-cols-6 gap-6">
                                {props.children}
                            </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button type="submit"
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export const FormFlex = (props) => {
    return (
        <div className="sm:mt-0">
            <div className="md:col-span-2">
                <form onSubmit={(event) => props.handleSubmit(event)}>
                    <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="p-4 bg-white sm:p-6">
                            {props.children}
                        </div>
                        <div className="px-4 pb-6 bg-gray-50 text-right sm:px-6">
                            <button type="submit"
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                {props.buttonName !== undefined ? props.buttonName : "Save"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export const LabelOnLeft = (props) => {
    return (
        <>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-2/12">
                    <Label label={props.label}/>
                </div>
                <div className="md:w-10/12">
                    <InputText id={props.id} name={props.name} onChange={props.onChange} value={props.value}
                               placeholder={props.placeholder}/>
                </div>
            </div>
        </>
    )
}

export const LabelOnTop = (props) => {
    return (
        <>
            <Label label={props.label}/>
            <InputText onChange={props.handleOnChange} value={props.value} placeholder={props.placeholder}/>
        </>
    )
}