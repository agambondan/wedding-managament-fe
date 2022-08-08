import {useRouter} from "next/router";
import Swal from "sweetalert2";
import axios from "axios";
import {Select} from "./form/select";
import {InputText} from "./form/fields";

export function Form(props) {
    console.log(props.inputFields)
    const router = useRouter()
    let keyInputFields = Object.keys(props.inputFields).filter(function (element) {
        return !element.match("id") && element !== "action"
    });
    const handleFormChange = (key, event) => {
        props.setInputFields({...props.inputFields, [key]: event.target.value})
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        Swal.fire({
                title: "Please Wait",
                allowOutsideClick: false
            }
        ).then()
        Swal.showLoading()
        await axios({
            method: props.data.method,
            url: props.data.url,
            data: props.inputFields,
            headers: {
                "Content-Type": `${props.data.content_type}`,
            },
            withCredentials: true,
        }).then(() => {
            Swal.hideLoading()
            Swal.update({
                icon: 'success',
                title: `Success ${props.data.title} ${props.data.module_name}`,
                showConfirmButton: false,
                timer: 3000,
                allowOutsideClick: true
            })
            setTimeout(() => {
                router.push(props.data.redirects)
                Swal.close()
            }, 3000)
        }).catch(err => {
            console.log(err.response)
            Swal.hideLoading()
            Swal.update({
                icon: 'error',
                title: `Failed ${props.data.title} ${props.data.module_name} <br> message : ${err.response.data.message}`,
                showConfirmButton: false,
                timer: 3000,
                allowOutsideClick: true
            })
            setTimeout(() => {
                Swal.close()
            }, 3000)
        })
    }
    return (
        <div className={"bg-gray-200 px-6 py-4"}>
            <form onSubmit={handleSubmit}>
                {keyInputFields.map((key, index) => {
                    return (
                        <div key={index}>
                            <div className={"py-2 my-1 text-2xl"}>
                                {(key.match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join(' ')}
                            </div>
                            {typeof props.inputFields[key] === "string" ?
                                <InputText key={key} keyInput={key} keyInputFields={keyInputFields[index]}
                                           inputFields={props.inputFields[key]} handleFormChange={handleFormChange}/>
                                :
                                typeof props.inputFields[key] === "boolean" ?
                                    <>
                                    </>
                                    :
                                    <>
                                    </>
                            }
                            {/*<input*/}
                            {/*    type={typeof props.inputFields[key] === "string" ? "text" :*/}
                            {/*        typeof props.inputFields[key] === "boolean" ? "checkbox" : "number"}*/}
                            {/*    className={"px-3 py-3 my-1 placeholder-blueGray-300 text-blueGray-600 bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full"}*/}
                            {/*    name={keyInputFields[index]}*/}
                            {/*    placeholder={(keyInputFields[index].match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toLowerCase()}${w.slice(1)}`).join(' ')}*/}
                            {/*    value={props.inputFields[key]}*/}
                            {/*    onChange={event => handleFormChange(key, event)}*/}
                            {/*/>*/}
                        </div>
                    )
                })}
                {props.select !== undefined ?
                    Object.keys(props.select).map((key, index) => {
                        return (
                            <Select key={index} data={props.select[key]} setInputFields={props.setInputFields}
                                    inputFields={props.inputFields}
                                    title={key}/>
                        )
                    })
                    :
                    <></>
                }
                <button type={"submit"} className="mt-5 px-10 py-3 text-blue-100 transition-colors
                         duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700">Save
                </button>
            </form>
        </div>
    );
}