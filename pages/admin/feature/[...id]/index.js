import AdminLayout from "../../../../components/Layout/admin";
import {Form} from "../../../../components/layout/form";
import {useState} from "react";
import axios from "axios";

export default function FeatureEdit(props) {
    const [inputFields, setInputFields] = useState({
        "feature_code": props.data.feature_code,
        "feature_name": props.data.feature_name,
    })
    const data = {
        url: `${process.env.IP}/api/v1/master/features/${props.data.id}`,
        redirects: `/admin/feature`,
        module_name: `Feature`,
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

FeatureEdit.layout = AdminLayout


export async function getServerSideProps(context) {
    const response = await axios.get(`${process.env.IP}/api/v1/master/features/${context.query.id[0]}`, {
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
