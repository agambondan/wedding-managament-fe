import AdminLayout from "../../../components/Layout/admin";
import {Form} from "../../../components/layout/form";
import {useState} from "react";

export default function GenderAdd() {
    const [inputFields, setInputFields] = useState({
            "gender_code": 0,
            "gender_name": "",
        }
    )
    const data = {
        url: `${process.env.ENDPOINT_MASTER}/genders`,
        redirects: `/admin/gender`,
        module_name: `Gender`,
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

GenderAdd.layout = AdminLayout
