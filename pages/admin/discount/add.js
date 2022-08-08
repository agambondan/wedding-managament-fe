import AdminLayout from "../../../components/Layout/admin";
import {Form} from "../../../components/layout/form";
import {useState} from "react";

export default function DiscountAdd() {
    const [inputFields, setInputFields] = useState(
        {name: '', description: '', percent: 1, is_active: false}
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
