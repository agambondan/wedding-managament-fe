import Swal from "sweetalert2";

export const ImagePopUp = (image, image_url) => {
    Swal.fire({
        imageUrl: image_url,
        imageWidth: 1500,
        width: 1500,
        imageHeight: 750,
        imageAlt: image,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Open image in a new tab"
    }).then((res) => {
        if (res.isConfirmed) {
            window.open(image_url)
        }
    })
}

export const PopUp = (image, image_url) => {
    Swal.fire({
        imageUrl: image_url,
        imageWidth: 1500,
        width: 1500,
        imageHeight: 750,
        imageAlt: image,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Open image in a new tab"
    }).then((res) => {
        if (res.isConfirmed) {
            window.open(image_url)
        }
    })
}
