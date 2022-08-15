import {useRouter} from "next/router";
import Swal from "sweetalert2";
import axios from "axios";
import {Select} from "./form/select";
import {InputNumber, InputText} from "./form/fields";
import {BorderedCheckBox} from "./form/checkbox";

export function Form(props) {
    const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;
    const router = useRouter()
    let keyInputFields = Object.keys(props.inputFields).filter(function (element) {
        return !element.match("id") && element !== "action" && element !== "html"
    });
    const handleChangeCheckBox = (key, event) => {
        props.setInputFields({...props.inputFields, [key]: !props.inputFields[key]})
    }
    const handleChangeText = (key, event) => {
        props.setInputFields({...props.inputFields, [key]: event.target.value})
    }
    const handleInputNumber = (key, event) => {
        if (rx_live.test(event.target.value)) {
            switch (key) {
                case "percent":
                    console.log(key)
                    props.setInputFields({
                        ...props.inputFields,
                        [key]: Math.max(0, Math.min(100, Number(event.target.value)))
                    })
                    return
                default :
                    console.log(key)
                    props.setInputFields({
                        ...props.inputFields,
                        [key]: Math.max(0, Math.min(1000000, Number(event.target.value)))
                    })
                    return;
            }
        }
    }
    const handleChangeNumber = (key, event) => {
        if (rx_live.test(event.target.value)) {
            switch (key) {
                case "percent":
                    props.setInputFields({
                        ...props.inputFields,
                        [key]: Math.max(0, Math.min(100, Number(event.target.value)))
                    })
                    return
                default :
                    props.setInputFields({
                        ...props.inputFields,
                        [key]: Math.max(0, Math.min(1000000, Number(event.target.value)))
                    })
                    return;
            }
        }
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
    console.log(props.inputFields)
    return (
        <div className={"bg-gray-200 px-6 py-4"}>
            <form onSubmit={handleSubmit}>
                {keyInputFields.map((key, index) => {
                    let max = key === "percent" ? 100 : 1000000
                    return (
                        <div key={index}>
                            {
                                typeof props.inputFields[key] === "string" ?
                                    <>
                                        <div className={"py-2 my-1 text-2xl"}>
                                            {(key.match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join(' ')}
                                        </div>
                                        <InputText key={key} keyInput={key}
                                                   inputFields={props.inputFields[key]}
                                                   handleChangeText={handleChangeText}/>
                                    </>
                                    :
                                    typeof props.inputFields[key] === "boolean" ?
                                        <div className={"flex flex-row py-2 my-1 text-2xl"}>
                                            {(key.match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join(' ')}
                                            <BorderedCheckBox keyInput={key} defaultChecked={props.inputFields[key]}
                                                              handleChangeCheckBox={handleChangeCheckBox}/>
                                        </div>
                                        :
                                        <>
                                            <div className={"py-2 my-1 text-2xl"}>
                                                {(key.match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join(' ')}
                                            </div>
                                            <InputNumber max={max} key={key} keyInput={key}
                                                         inputFields={props.inputFields[key]}
                                                         handleInputNumber={handleInputNumber}
                                                         handleChangeNumber={handleChangeNumber}/>
                                        </>
                            }
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
                {props.children}
                <button type={"submit"} className="mt-5 px-10 py-3 text-blue-100 transition-colors
                         duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700">Save
                </button>
            </form>
        </div>
    );
}