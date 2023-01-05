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

export function CardProfileHalfWidth(props) {
    return (
        <div className="xl:w-1/2">
            <h2 className={"pb-4"}>{props.title}</h2>
            <div className={"flex"}>
                <div
                    className="h-96 lg:w-96 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                    style={{backgroundImage: `url(https://media.istockphoto.com/id/1174403060/id/foto/pria-berjas-mengoreksi-dasi-kupu-kupunya-persiapan-pagi-pengantin-pria-di-rumah-foto-fashion.jpg?b=1&s=612x612&w=0&k=20&c=J5sMoGgePkeQzWs7tYrSoBmLNSpnX1rywM4JBmvZOoU=)`}}
                    title="Woman holding a mug">
                </div>
                <div
                    className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-8">
                        <p className="text-sm text-gray-600 flex items-center">
                            <svg className="fill-current text-gray-500 w-3 h-3 mr-2"
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20">
                                <path
                                    d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z"/>
                            </svg>
                            Members only
                        </p>
                        <div className="text-gray-900 font-bold text-xl mb-2">Can coffee make you a better
                            developer?
                        </div>
                        <p className="text-gray-700 text-base">Lorem ipsum dolor sit amet, consectetur
                            adipisicing
                            elit.
                            Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
                            nihil.</p>
                    </div>
                    <div className="flex items-center">
                        <img className="w-10 h-10 rounded-full mr-4"
                             src="https://media.istockphoto.com/id/1174403060/id/foto/pria-berjas-mengoreksi-dasi-kupu-kupunya-persiapan-pagi-pengantin-pria-di-rumah-foto-fashion.jpg?b=1&s=612x612&w=0&k=20&c=J5sMoGgePkeQzWs7tYrSoBmLNSpnX1rywM4JBmvZOoU="
                             alt="Avatar of Jonathan Reinink"/>
                        <div className="text-sm">
                            <p className="text-gray-900 leading-none">Jonathan Reinink</p>
                            <p className="text-gray-600">Aug 18</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex space-x-2 justify-end pt-10">
                <button type="button" onClick={() => {
                    props.setClick(!props.click)
                }}
                        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                    Edit Profile {props.title}
                </button>
            </div>
        </div>
    )
}