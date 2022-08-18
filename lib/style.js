export const ImgBgCard = ({url}) => {
    return (
        <>
            <div className={"img-bg-card"}/>
            <style jsx global>
                {
                    `.img-bg-card {
                        background-image: url("${url}"); /* The image used */
                        background-color: #cccccc; /* Used if the image is unavailable */
                        height: 180px; /* You must set a specified height */
                        background-position: center; /* Center the image */
                        background-repeat: no-repeat; /* Do not repeat the image */
                        background-size: cover; /* Resize the background image to cover the entire container */
                    }`
                }
            </style>
        </>
    )
}