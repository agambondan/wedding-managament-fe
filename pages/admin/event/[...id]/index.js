import AdminLayout from "../../../../components/Layout/admin";
import {Form} from "../../../../components/layout/form";
import {useState} from "react";
import axios from "axios";

export default function EventEdit(props) {
    const [inputFields, setInputFields] = useState({
        "event_code": props.data.event_code,
        "event_name": props.data.event_name,
        "short_description": props.data.short_description,
        "description": props.data.description,
    })
    const data = {
        url: `${process.env.IP}/api/v1/master/events/${props.data.id}`,
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
    const response = await axios.get(`${process.env.IP}/api/v1/master/events/${context.query.id[0]}`, {
        withCredentials: true
    })
    return {
        props: {
            context: {
                query: context.query
            },
            data: response.data
        }, // will be passed to the page component as props
    }
}
