import AdminLayout from "../../../components/admin";
import {Form} from "../../../components/layout/form/form";
import {useState} from "react";

export default function StateProvinceAdd(props) {
    const [inputFields, setInputFields] = useState(
        {state_province_code: '', state_province_name: ''}
    )
    const data = {
        url: `${process.env.ENDPOINT_MASTER}/state-provinces`,
        redirects: `/admin/province`,
        module_name: `StateProvince`,
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

StateProvinceAdd.layout = AdminLayout