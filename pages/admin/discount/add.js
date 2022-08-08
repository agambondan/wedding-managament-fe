import AdminLayout from "../../../components/Layout/admin";
import {Form} from "../../../components/layout/form";
import {useState} from "react";
import axios from "axios";

export default function DiscountAdd(props) {
    const [inputFields, setInputFields] = useState(
        {name: '', description: '', percent: 0, is_active: false}
    )
    const data = {
        url: `${process.env.IP}/api/v1/master/discounts`,
        redirects: `/admin/discount`,
        module_name: `Discount`,
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

DiscountAdd.layout = AdminLayout
