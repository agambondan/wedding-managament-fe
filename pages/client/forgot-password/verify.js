import {useState} from "react";
import axios from "axios";

export default function VerifyForgotPassword(props) {
    const [user, setUser] = useState({})
    const [show, setShow] = useState(false)
    const [show1, setShow1] = useState(false)
    const handleChangeUser = (e) => {
        switch (e.target.id) {
            case "email":
                setUser({...user, email: e.target.value})
                return;
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
        const response = await axios.post(``, {})
    }
    console.log(user)
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
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
                            <input onChange={handleChangeUser} type="email" name="email" id="email"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="name@gmail.com" required={true}/>
                        </div>
                        <div>
                            <label htmlFor="password"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                password</label>
                            <div className="flex flex-row">
                                <input type={show ? "text" : "password"} name="password" id="password"
                                       placeholder="••••••••" onChange={handleChangeUser}
                                       className="flex-grow bg-gray-50 border-t border-b border-l border-gray-300 text-gray-900 sm:text-sm rounded-l focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       required={true}/>
                                <label onClick={() => setShow(!show)}
                                       className="flex bg-gray-50 border-r border-t border-b border-gray-300 text-gray-900 sm:text-sm rounded-r focus:ring-blue-600 focus:border-blue-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    {show ? "Hide" : "Show"}
                                </label>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="confirm-password"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
                                password</label>
                            <div className="flex flex-row">
                                <input type={show1 ? "text" : "password"} name="confirm-password" id="confirm-password"
                                       placeholder="••••••••" onChange={handleChangeUser}
                                       className="flex-grow bg-gray-50 border-t border-b border-l border-gray-300 text-gray-900 sm:text-sm rounded-l focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       required={true}/>
                                <label onClick={() => setShow1(!show1)}
                                       className="flex bg-gray-50 border-r border-t border-b border-gray-300 text-gray-900 sm:text-sm rounded-r focus:ring-blue-600 focus:border-blue-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    {show1 ? "Hide" : "Show"}
                                </label>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="confirm-password"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
                                password</label>
                            <div className="flex flex-row">
                                <input type={show1 ? "text" : "password"} name="confirm-password" id="confirm-password"
                                       placeholder="••••••••" onChange={handleChangeUser}
                                       className="flex-grow bg-gray-50 border-t border-b border-l border-gray-300 text-gray-900 sm:text-sm rounded-l focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       required={true}/>
                                <label onClick={() => setShow1(!show1)}
                                       className="flex bg-gray-50 border-r border-t border-b border-gray-300 text-gray-900 sm:text-sm rounded-r focus:ring-blue-600 focus:border-blue-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    {show1 ? "Hide" : "Show"}
                                </label>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="newsletter" aria-describedby="newsletter" type="checkbox"
                                       className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                       required={true}/>
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="newsletter" className="font-light text-gray-500 dark:text-gray-300">I
                                    accept the <a
                                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                        href="#">Terms and Conditions</a></label>
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