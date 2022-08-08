import AdminLayout from "../../../components/Layout/admin";
import {Form} from "../../../components/layout/form";
import {useState} from "react";
import axios from "axios";

export default function StateProvinceAdd(props) {
    const [inputFields, setInputFields] = useState(
        {state_province_code: '', state_province_name: ''}
    )
    const data = {
        url: `${process.env.IP}/api/v1/master/state-provinces`,
        redirects: `/admin/province`,
        module_name: `StateProvince`,
        title: `Save`,
        content_type: `application/json`,
        method: "POST"
    }
    console.log(props)
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