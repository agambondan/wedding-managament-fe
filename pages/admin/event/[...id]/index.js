import AdminLayout from "../../../../components/Layout/admin";
import {Form} from "../../../../components/layout/form";
import {useState} from "react";
import {MasterService} from "../../../../lib/http";

export default function EventEdit(props) {
    const [inputFields, setInputFields] = useState({
        "event_code": props.data.event_code,
        "event_name": props.data.event_name,
        "short_description": props.data.short_description,
        "description": props.data.description,
    })
    const data = {
        url: `${process.env.ENDPOINT_MASTER}/events/${props.data.id}`,
        redirects: `/admin/event`,
        module_name: `Event`,
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

EventEdit.layout = AdminLayout

export async function getServerSideProps(context) {
    const {req, query} = context
    let request = {
        url: `events/${query.id[0]}`,
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
