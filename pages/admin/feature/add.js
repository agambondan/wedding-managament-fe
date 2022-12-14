import AdminLayout from "../../../components/admin";
import {Form} from "../../../components/layout/form/form";
import {useState} from "react";

export default function FeatureAdd() {
    const [inputFields, setInputFields] = useState({
        "feature_code": "",
        "feature_name": "",
        }
    )
    const data = {
        url: `${process.env.ENDPOINT_MASTER}/features`,
        redirects: `/admin/feature`,
        module_name: `Feature`,
        title: `Save`,
        content_type: `application/json`,
        method: "POST"
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

FeatureAdd.layout = AdminLayout
