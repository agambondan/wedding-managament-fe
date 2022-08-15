import AdminLayout from "../../../../components/Layout/admin";
import {Form} from "../../../../components/layout/form";
import {useState} from "react";
import axios from "axios";

export default function ThemeEdit(props) {
    const [inputFields, setInputFields] = useState({
        name: props.data.name,
        html: props.data.html,
        description: props.data.description,
    })
    const data = {
        url: `${process.env.IP}/api/v1/master/themes/${props.data.id}`,
        redirects: `/admin/theme`,
        module_name: `Theme`,
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

ThemeEdit.layout = AdminLayout


export async function getServerSideProps(context) {
    const response = await axios.get(`${process.env.IP}/api/v1/master/themes/${context.query.id[0]}`, {
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
