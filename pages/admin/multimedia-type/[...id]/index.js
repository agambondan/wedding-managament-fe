import AdminLayout from "../../../../components/admin";
import {Form} from "../../../../components/layout/form/form";
import {useState} from "react";
import {MasterService} from "../../../../lib/http";

export default function MultimediaTypeEdit(props) {
    const [inputFields, setInputFields] = useState({
        "name": props.data.name,
        "slug": props.data.slug,
    })
    const data = {
        url: `${process.env.ENDPOINT_MASTER}/multimedia-types/${props.data.id}`,
        redirects: `/admin/multimedia-type`,
        module_name: `MultimediaType`,
        title: `Update`,
        content_type: `application/json`,
        method: "PUT"
    }
    return (
        <>
            <Form
                inputFields={inputFields}
                setInputFields={setInputFields}
                data={data}
            />
        </>
    )
}

MultimediaTypeEdit.layout = AdminLayout

export async function getServerSideProps(context) {
    const {req, query} = context
    let request = {
        url: `multimedia-types/${query.id[0]}`,
        headers: {
            "Cookie": `token=${req.cookies.token}`
        },
    }
    const response = await MasterService(request).then(res => {
        return res
    }).catch(err => {
        return err
    })
    if (response.status !== 200) {
        return {
            redirect: {
                permanent: false,
                destination: '/admin'
            }
        }
    }
    return {
        props: {
            context: {
                query: context.query
            },
            data: response.data
        }, // will be passed to the page component as props
    }
}
