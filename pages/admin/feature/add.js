import AdminLayout from "../../../components/Layout/admin";
import {Form} from "../../../components/layout/form";
import {useState} from "react";

export default function FeatureAdd() {
    const [inputFields, setInputFields] = useState({
        "feature_code": "",
        "feature_name": "",
        }
    )
    const data = {
        url: `${process.env.IP}/api/v1/master/features`,
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
