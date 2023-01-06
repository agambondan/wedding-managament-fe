import Swal from "sweetalert2";

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