import {useRouter} from "next/router";

export default function VerifySlug(props) {
    const router = useRouter()
    return (
        <>
            <h1>ASO</h1>
        </>
    )
}

export const getServerSideProps = (context) => {
    const {req, query} = context

    return {
        props: {
            query
        }
    }
}