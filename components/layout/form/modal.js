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
    let keyInputFields = Object.keys(props.inputFields).filter(function (element) {
        return !element.match("id") && element !== "action" && element !== "html"
    });
    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div
                        className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div
                            className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                {props.title}
                            </h3>
                            <button
                                className="bg-transparent ml-auto text-black float-right text-3xl leading-none font-semibold focus:outline-none"
                                onClick={() => props.setClick(false)}>
                                <span className="text-black ">×</span>
                            </button>
                        </div>

                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            {/*{keyInputFields.map((key, index) => {*/}
                            {/*    return (*/}
                            {/*        <>*/}
                            {/*            <div className={"py-1 my-1 text-2xl"}>*/}
                            {/*            </div>*/}
                            {/*                {(key.match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join(' ')}*/}
                            {/*                <InputText key={key} keyInput={key}*/}
                            {/*                           inputFields={props.inputFields[key]}*/}
                            {/*                           setInputFields={props.setInputFields}*/}
                            {/*                           data={props.data}*/}
                            {/*                           select={props.select}*/}
                            {/*                />*/}
                            {/*        </>*/}
                            {/*    )*/}
                            {/*})}*/}
                            <Form
                                inputFields={props.inputFields}
                                setInputFields={props.setInputFields}
                                data={props.data}
                                select={props.select}
                            />
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