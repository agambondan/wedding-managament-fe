import Link from "next/link";
import {useRouter} from "next/router";
import Swal from "sweetalert2";

export const AddButton = (props) => {
    return (
        <div className="flex mt-1.5 sm:mt-0 ">
            <Link
                href={`${props.href}`}>
                <a>
                    <button
                        className="h-9 xs:ml-5 sm:ml-5 xs:mx-0 px-5 text-blue-100 transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700">{props.buttonName === undefined ? "Add" : props.buttonName}
                    </button>
                </a>
            </Link>
        </div>
    )
}

export const DeleteButton = (props) => {
    const router = useRouter()
    const handleDelete = () => {
        Swal.fire({
            title: `Do you want to delete ${props.name.toLowerCase()}?`,
            showCancelButton: true,
            confirmButtonText: `Yes`,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.update({
                        title: "Please Wait",
                        allowOutsideClick: false
                    }
                )
                Swal.showLoading()
                props.delete(props.id).then(res => {
                    Swal.fire({
                        title: "Delete Success",
                        timer: 5000
                    })
                    Swal.hideLoading()
                    setTimeout(async () => {
                        router.push(router.pathname)
                    }, 500)
                }).catch(error => {
                    Swal.hideLoading()
                    Swal.fire({
                        title: `${error}`,
                        timer: 5000
                    })
                })
            }
        })
    }
    return (
        <button type="button" className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-3 py-3 rounded
                                shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                onClick={handleDelete}><i className="fas fa-trash-alt"/>
        </button>
    )
}

export const EditButton = (props) => {
    return (
        <Link href={`${props.basepath}/edit/${props.name}`}>
            <a>
                <button type="button" className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-3 py-3 rounded
                                shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150">
                    <i className="fas fa-edit"/>
                </button>
            </a>
        </Link>
    )
}