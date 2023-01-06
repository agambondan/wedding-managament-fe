import {InputText} from "./fields";
import {Form} from "./form";

export function DeleteModal() {
    return (
        <>
            <button
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button" data-modal-toggle="popup-modal">
                Toggle modal
            </button>

            <div id="popup-modal" tabIndex="-1"
                 className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center flex"
                 aria-modal="true" role="dialog">
                <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button type="button"
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                data-modal-toggle="popup-modal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clipRule="evenodd"></path>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-6 text-center">
                            <svg aria-hidden="true" className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
                                 fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you
                                want to
                                delete this product?</h3>
                            <button data-modal-toggle="popup-modal" type="button"
                                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                Yes, I'm sure
                            </button>
                            <button data-modal-toggle="popup-modal" type="button"
                                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No,
                                cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export const FormModal = (props) => {
    // let keyInputFields = Object.keys(props.inputFields).filter(function (element) {
    //     return !element.match("id") && element !== "action" && element !== "html"
    // });
    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-auto overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div
                        className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div
                            className="flex px-32 py-2 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="justify-start text-3xl font-semibold">
                                {props.title}
                            </h3>
                            <button
                                className="justify-end bg-transparent ml-auto text-black float-right text-3xl leading-none font-semibold focus:outline-none"
                                onClick={() => props.setClick(false)}>
                                <span className="text-black ">×</span>
                            </button>
                        </div>

                        {/*body*/}
                        <div className="relative px-2 py-2 flex-auto">
                            {
                                props.form !== undefined ?
                                    props.form
                                    :
                                    <></>
                                // <Form
                                //     inputFields={props.inputFields}
                                //     setInputFields={props.setInputFields}
                                //     data={props.data}
                                //     select={props.select}
                                // />
                            }
                        </div>

                        {/*footer*/}
                        <div
                            className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="bg-red-400 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => props.setClick(false)}
                            >
                                Close
                            </button>
                            <button
                                className="bg-blue-400 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => {
                                    props.setClick(false)
                                }}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}


export const BaseModal1 = (props) => {
    let keyInputFields = props.inputFields !== undefined ? Object.keys(props.inputFields).filter(function (element) {
        return !element.match("id") && element !== "action" && element !== "html"
    }) : ""
    return (
        <>
            <div
                // className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
                className="align-middle justify-center items-center flex overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-full h-full max-w-md md:h-auto">
                    <div className="bg-white rounded-lg shadow-xl dark:bg-gray-700 -mx-10">
                        {/*header*/}
                        <div
                            className="px-4 py-2 border-b border-solid rounded-t">
                            <h3 className="uppercase text-3xl font-semibold">
                                {props.title}
                            </h3>
                            <button type="button" onClick={() => {
                                props.setClick(false)
                            }} className="absolute top-2 -mr-4 right-0 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg
                            text-sm py-2 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                          clipRule="evenodd"></path>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-2">
                            {
                                props.children !== undefined ?
                                    props.children
                                    :
                                    <div className={"flex flex-row"}>
                                        {keyInputFields.map((key, index) => {
                                            return (
                                                <>
                                                    <div key={index} className={"flex-shrink px-1 text-xl"}>
                                                        {(key.match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join(' ')}
                                                        <InputText key={key} keyInput={key}
                                                                   inputFields={props.inputFields[key]}
                                                                   handleChangeText={() => {
                                                                   }}/>
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </div>
                            }
                        </div>
                        {/*footer*/}
                        <div
                            className="flex items-center justify-center py-3 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="bg-red-400 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => props.setClick(false)}
                            >
                                Close
                            </button>
                            <button
                                className="bg-blue-400 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => {
                                    props.setClick(false)
                                }}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export function BaseModal(props) {
    return (
        <div>
            <div className="opacity-25 fixed inset-0 z-20 bg-black"></div>
            <div className="fixed inset-0 z-20 overflow-y-auto">
                <div className="flex items-center justify-center px-2 py-5 text-center sm:block">
                    <div className="fixed inset-0 transition-opacity bg-black/60"></div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                    <div className="relative inline-block w-full p-5 py-8 sm:p-8 sm:pt-10 text-left align-middle
                     transition-all transform bg-white dark:bg-black rounded-md max-w-xl">
                        <div
                            className="border-b border-solid rounded-t">
                            <h3 className="uppercase text-3xl font-semibold">
                                Profile {props.title}
                            </h3>
                        </div>
                        <div className={"py-2"}/>
                        <div className="absolute top-0 right-0 pt-4 pr-4 block">
                            <button type="button" tabIndex="0" onClick={() => props.setClick(false)}
                                    className="rounded-md text-gray hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2">
                                <span className="sr-only">Close</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor" aria-hidden="true" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        {props.children}
                        {props.button !== undefined ?
                            props.button :
                            <div
                                className="flex items-center justify-end mt-3 pt-2 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="bg-red-400 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    type="button" onClick={() => props.setClick(false)}>
                                    Close
                                </button>
                                <button
                                    className="bg-blue-400 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    type="button" onClick={() => props.setClick(false)}>
                                    Save Changes
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}