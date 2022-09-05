import React, {useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import Swal from "sweetalert2";

export default function Login() {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)
    const [show, setShow] = useState(false);
    const handleLogin = async (event) => {
        event.preventDefault()
        Swal.fire({
                title: "Please Wait",
                allowOutsideClick: false,
                timer: 2000
            }
        )
        Swal.showLoading()
        const response = await axios.post(`${process.env.IP}/api/v1/auth/login`, {
            "email": username, "password": password, "remember_me": rememberMe
        }, {
            // disable with credentials if be not regis your ip to be cors
            withCredentials: true,
        }).then(res => {
            return res
        }).catch(err => {
            if (err.response) {
                return err.response
            } else if (err.request) {
                return err.request
            } else {
                return err.message
            }
        })
        console.log(response)
        if (response.status === 200) {
            Swal.hideLoading()
            setTimeout(() => {
                Swal.fire({
                    icon: 'success',
                    title: `Login Success`,
                    showConfirmButton: false,
                    timer: 3000,
                    allowOutsideClick: true
                })
            }, 1000)
            setTimeout(() => {
                router.push("/admin")
            }, 5000)
        } else {
            Swal.hideLoading()
            Swal.update({
                icon: 'error',
                title: "Email or password may is wrong",
                showConfirmButton: false,
                timer: 3000,
                allowOutsideClick: true
            })
        }
    }
    return (
        <div className="bg-blue-400 h-screen w-screen">
            <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
                <div className="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2 bg-white sm:mx-0 h-4/6">
                    <div className="flex flex-col w-full md:w-1/2 p-4">
                        <div className="flex flex-col flex-1 justify-center mb-8">
                            <h1 className="text-4xl mb-4 text-center font-thin">Welcome Back</h1>
                            <div className="w-full mt-4">
                                <form className="form-horizontal w-3/4 mx-auto" onSubmit={handleLogin}>
                                    <div className="flex flex-col mt-4">
                                        <input id="email" type="text" name="username"
                                               className="flex-grow h-8 px-2 border rounded border-gray-700"
                                               onChange={(event => {
                                                   setUsername(event.target.value)
                                               })} required placeholder="username or email"/>
                                    </div>
                                    <div className="flex flex-row mt-4">
                                        <input id="password" type={show ? "text" : "password"} name="password"
                                               className="flex-grow h-8 px-2 rounded-l border-t border-b border-l border-gray-700"
                                               onChange={(event => {
                                                   setPassword(event.target.value)
                                               })} required placeholder="Password"/>
                                        <label onClick={() => setShow(!show)}
                                               className="flex h-8 px-2 justify-center items-center rounded-r border-r border-t border-b border-gray-700 cursor-pointer">
                                            {show ? "Hide" : "Show"}
                                        </label>
                                    </div>
                                    <div className="flex items-center mt-4">
                                        <input type="checkbox" name="remember" id="remember" className="mr-2"
                                               onClick={() => setRememberMe(!rememberMe)}/>
                                        <label htmlFor="remember" className="text-sm text-grey-dark">Remember
                                            Me</label>
                                    </div>
                                    <div className="flex flex-col mt-8">
                                        <button type="submit"
                                                className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded">
                                            Login
                                        </button>
                                    </div>
                                </form>
                                <div className="text-center mt-4">
                                    <a className="no-underline hover:underline text-blue-dark text-xs">
                                        Forgot Your Password?
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block md:w-1/2 rounded-r-lg login-form"/>
                </div>
            </div>
        </div>
    )
}