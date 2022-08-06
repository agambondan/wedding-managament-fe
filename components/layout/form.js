import {useState} from "react";
import {useRouter} from "next/router";
import Swal from "sweetalert2";
import axios from "axios";

function Form(props) {
    const [inputFields, setInputFields] = useState([
        {name: '', age: ''}
    ])
    return (
        <div className="App">
            <form onSubmit={props.handleSubmit}>
                {props.input.map((input, index) => {
                    return (
                        <div key={index}>
                            <input
                                name='name'
                                placeholder='Name'
                                value={input.name}
                            />
                            <input
                                name='age'
                                placeholder='Age'
                                value={input.age}
                            />
                        </div>
                    )
                })}
            </form>
        </div>
    );
}

export function ObjectForm(props) {
    const router = useRouter()
    let keyInputFields = Object.keys(props.inputFields);
    const handleFormChange1 = (key, event) => {
        props.setInputFields({...props.inputFields, [key]: event.target.value})
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        Swal.fire({
                title: "Please Wait",
                allowOutsideClick: false
            }
        )
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
        <div>
            <form onSubmit={handleSubmit}>
                {keyInputFields.map((key, index) => {
                    return (
                        <div key={index}>
                            <div
                                className={"py-2 text-2xl"}>{(key.match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join(' ')}</div>
                            <input
                                className={"px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full"}
                                name={keyInputFields[index]}
                                placeholder={(keyInputFields[index].match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toLowerCase()}${w.slice(1)}`).join(' ')}
                                value={props.inputFields[key]}
                                onChange={event => handleFormChange1(key, event)}
                            />
                        </div>
                    )
                })}
                <button type={"submit"} className="mt-5 px-10 py-3 text-blue-100 transition-colors
                         duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700">Save
                </button>
            </form>
        </div>
    );
}