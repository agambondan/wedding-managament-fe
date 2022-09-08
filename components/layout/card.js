export default function CardRippleEffect() {
    return (
        <div className="h-screen grid place-content-center">
            <div className="rounded-lg shadow-lg bg-white max-w-sm">
                <div className="bg-green-500 h-48 grid place-content-center border-b-2">
                    <i className="fa-solid fa-user-check fa-5x" style={{color: "#00FF00"}}/>
                </div>
                <div className="p-6">
                    <h5 className="text-gray-900 text-xl font-medium mb-2"></h5>
                    <p className="text-gray-700 text-base mb-4">
                        Congratulations, your account has been successfully created.
                        automatically redirect to login page
                    </p>
                </div>
                <div className="flex mb-7 space-x-2 justify-center">
                    <button type="button"
                            className="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out">Success
                    </button>
                </div>
            </div>
        </div>
    )
}