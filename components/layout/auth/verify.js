import React, {useState} from "react";
import {AuthService} from "../../../lib/http";
import Swal from "sweetalert2";
import Link from "next/link";

export function VerifyForgotPassword(props) {
    const [show, setShow] = useState(false)
    const [show1, setShow1] = useState(false)
    const [isPasswordSame, setIsPasswordSame] = useState(false)
    const [checkTerm, setCheckTerm] = useState(false)
    const [user, setUser] = useState({
        "email": props.data.email,
        "password": "",
        "confirm_password": "",
        "reset_password_code": props.data.reset_password_code
    })
    const handleChange = (e) => {
        switch (e.target.id) {
            case "password":
                setUser({...user, password: e.target.value})
                return
            case "confirm-password":
                setUser({...user, confirm_password: e.target.value})
                return;
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (user.password !== user.confirm_password) {
            setIsPasswordSame(true)
            return
        }
        setIsPasswordSame(false)
        const request = {
            url: `forgot-password`,
            method: "POST",
            data: user
        }
        await AuthService(request).then(res => {
            console.log(res)
            Swal.fire({
                icon: "success",
                title: res.data.message,
                showConfirmButton: false,
                timer: 5000,
                allowOutsideClick: true
            })
            return res
        }).catch(err => {
            if (err.response) {
                Swal.fire({
                    icon: "error",
                    title: "password must greater than 8 word",
                    showConfirmButton: false,
                    timer: 5000,
                    allowOutsideClick: true
                })
            }
            return err
        })
    }
    console.log(user, checkTerm)
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                         alt="logo"/>
                    Undangan Online
                </a>
                <div
                    className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                    <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Change Password
                    </h2>
                    <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                email</label>
                            <input type="email" name="email" id="email" value={user.email} disabled={true}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="name@company.com" required={true}/>
                        </div>
                        <div>
                            <label htmlFor="password"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                New Password
                            </label>
                            <div className={"relative mb-2"}>
                                <input type={`${show ? "text" : "password"}`} name="password" id="password"
                                       value={user.password}
                                       onChange={handleChange}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="••••••••" required={true}/>
                                <div
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                    <label onClick={() => {
                                        setShow(!show)
                                    }}>
                                        <svg className={`h-6 text-gray-700 ${show ? "hidden" : "block"}`}
                                             fill="none"
                                             xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 576 512">
                                            <path fill="currentColor"
                                                  d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z">
                                            </path>
                                        </svg>
                                    </label>
                                    <label onClick={() => {
                                        setShow(!show)
                                    }}>
                                        <svg className={`h-6 text-gray-700 ${show ? "block" : "hidden"}`}
                                             fill="none"
                                             xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 640 512">
                                            <path fill="currentColor"
                                                  d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z">
                                            </path>
                                        </svg>
                                    </label>
                                </div>
                            </div>
                            <p className={`${isPasswordSame ? "block" : "hidden"} text-xs text-red-600`}>Password not
                                equals with Confirm Password</p>
                        </div>
                        <div>
                            <label htmlFor="confirm-password"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Confirm password
                            </label>
                            <div className={"relative mb-2"}>
                                <input type={`${show1 ? "text" : "password"}`} name="password" id="confirm-password"
                                       value={user.confirm_password}
                                       onChange={handleChange}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="••••••••" required={true}/>
                                <div
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                    <label onClick={() => {
                                        setShow1(!show1)
                                    }}>
                                        <svg className={`h-6 text-gray-700 ${show1 ? "hidden" : "block"}`}
                                             fill="none"
                                             xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 576 512">
                                            <path fill="currentColor"
                                                  d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z">
                                            </path>
                                        </svg>
                                    </label>
                                    <label onClick={() => {
                                        setShow1(!show1)
                                    }}>
                                        <svg className={`h-6 text-gray-700 ${show1 ? "block" : "hidden"}`}
                                             fill="none"
                                             xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 640 512">
                                            <path fill="currentColor"
                                                  d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z">
                                            </path>
                                        </svg>
                                    </label>
                                </div>
                            </div>
                            <p className={`${isPasswordSame ? "block" : "hidden"} text-xs text-red-600`}>Confirm
                                Password not equals with Password</p>
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="newsletter" aria-describedby="newsletter" type="checkbox" checked={checkTerm}
                                       onChange={() => setCheckTerm(!checkTerm)}
                                       className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                       required={true}/>
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="newsletter" className="font-light text-gray-500 dark:text-gray-300">
                                    I accept the
                                    <Link href={"/client/terms"}>
                                        <a className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                                            &nbsp;Terms and Conditions
                                        </a>
                                    </Link>
                                </label>
                            </div>
                        </div>
                        <button type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Reset
                            password
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}