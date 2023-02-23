import Swal from "sweetalert2";
import axios from "axios";

export const ImagePopUp = (imageAlt, imageUrl) => {
    Swal.fire({
        imageUrl: imageUrl,
        imageWidth: 1500,
        width: 1500,
        imageHeight: 750,
        imageAlt: imageAlt,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Open image in a new tab"
    }).then((res) => {
        if (res.isConfirmed) {
            window.open(imageUrl)
        }
    })
}

export function FormPopUp(props) {
    return Swal.fire({
        title: `Do you want to delete this item?`,
        showCancelButton: true,
        confirmButtonText: `Yes`,
        showConfirmButton: true
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.update({
                    title: "Please Wait",
                    allowOutsideClick: false
                }
            )
            Swal.showLoading()
            axios.delete(`${process.env.IP}/{props.url}`, {
                withCredentials: true
            }).then(res => {
                Swal.fire({
                    title: "Delete Success",
                    timer: 5000
                })
                Swal.hideLoading()
                setTimeout(() => {
                    props.router.push(props.router.pathname)
                    Swal.close()
                }, 3000)
            }).catch(error => {
                Swal.hideLoading()
                Swal.fire({
                    title: `${error}`,
                    timer: 3000
                })
                setTimeout(() => {
                    Swal.close()
                }, 3000)
            })
        }
    })
}

export function SwalDeletePopUp(props) {
    return Swal.fire({
        title: `Do you want to delete this item?`,
        showCancelButton: true,
        confirmButtonText: `Yes`,
        confirmButtonColor: 'Red',
        showConfirmButton: true
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.update({
                    title: "Please Wait",
                    allowOutsideClick: false
                }
            )
            Swal.showLoading()
            axios.delete(`${process.env.IP}/{props.url}`, {
                withCredentials: true
            }).then(res => {
                Swal.fire({
                    title: "Delete Success",
                    timer: 5000
                })
                Swal.hideLoading()
                setTimeout(() => {
                    props.router.push(props.router.pathname)
                    Swal.close()
                }, 3000)
            }).catch(error => {
                Swal.hideLoading()
                Swal.fire({
                    title: `${error}`,
                    timer: 3000
                })
                setTimeout(() => {
                    Swal.close()
                }, 3000)
            })
        }
    })
}