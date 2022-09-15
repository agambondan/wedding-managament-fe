import Link from "next/link";
import {AuthService} from "../../../lib/http";
import {useState} from "react";
import Swal from "sweetalert2";

export default function Forgot() {
    const [email, setEmail] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        const request = {
            url: `send-code/reset-password`,
            data: {"email": `${email}`},
            method: "POST"
        }
        await AuthService(request).then(res => {
            Swal.fire({
                icon: 'success',
                title: res.data.message,
                showConfirmButton: false,
                timer: 5000,
                allowOutsideClick: true
            })
            return res
        }).catch(err => {
            if (err.response) {
                Swal.fire({
                    icon: 'error',
                    title: err.response.data.message,
                    showConfirmButton: false,
                    timer: 5000,
                    allowOutsideClick: true
                })
                return err.response
            } else {
                return err
            }
        })
    }
    return (
        <main id="content" role="main"
              className="w-full h-screen max-w-md mx-auto grid grid-cols-1 gap-4 content-center">
            <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Forgot password?</h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Remember your password?&nbsp;
                            <Link href="/client/login">
                                <a className="text-blue-600 decoration-2 hover:underline font-medium">
                                    Login here
                                </a>
                            </Link>
                        </p>
                    </div>
                    <div className="mt-5">
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-y-4">
                                <div>
                                    <label className="block text-sm font-bold ml-1 mb-2 dark:text-white">Email
                                        address</label>
                                    <div className="relative">
                                        <input type="email" id="email" name="email" aria-required={true}
                                               pattern=".+@.+\.com" title="Please provide only username@email.com email"
                                               className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                                               required aria-describedby="email-error"
                                               onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a
                                        valid email address so we can get back to you</p>
                                </div>
                                <button type="submit"
                                        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                                    Send Verify Code
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <p className="mt-3 flex justify-center items-center text-center divide-x divide-gray-300 dark:divide-gray-700">
                <Link href="/client">
                    <a className="pl-3 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200">
                        Contact us!
                    </a>
                </Link>
            </p>
        </main>
    )
}