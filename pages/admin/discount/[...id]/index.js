import AdminLayout from "../../../../components/Layout/admin";
import {Form} from "../../../../components/layout/form";
import {useState} from "react";
import axios from "axios";

export default function DiscountEdit(props) {
    const [inputFields, setInputFields] = useState({
        name: props.data.name,
        description: props.data.description,
        percent: props.data.percent,
        is_active: props.data.is_active
    })
    const data = {
        url: `${process.env.IP}/api/v1/master/discounts/${props.data.id}`,
        redirects: `/admin/discount`,
        module_name: `Discount`,
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

DiscountEdit.layout = AdminLayout


export async function getServerSideProps(context) {
    const response = await axios.get(`${process.env.IP}/api/v1/master/discounts/${context.query.id[0]}`, {
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
