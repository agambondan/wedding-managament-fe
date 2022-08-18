import AdminLayout from "../../../../components/Layout/admin";
import {Form} from "../../../../components/layout/form";
import {useState} from "react";
import {MasterService} from "../../../../lib/http";

export default function FeatureEdit(props) {
    const [inputFields, setInputFields] = useState({
        "feature_code": props.data.feature_code,
        "feature_name": props.data.feature_name,
    })
    const data = {
        url: `${process.env.ENDPOINT_MASTER}/features/${props.data.id}`,
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
    const {req, query} = context
    let request = {
        url: `features/${query.id[0]}`,
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
