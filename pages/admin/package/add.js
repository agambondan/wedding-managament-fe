import AdminLayout from "../../../components/Layout/admin";
import {Form} from "../../../components/layout/form";
import {useState} from "react";
import axios from "axios";

export default function PackageAdd(props) {
    const [inputFields, setInputFields] = useState({
            "name": "",
            "sku": "",
            "price": 0,
            "description": "",
        }
    )
    const data = {
        url: `${process.env.IP}/api/v1/master/packages`,
        redirects: `/admin/package`,
        module_name: `Package`,
        title: `Save`,
        content_type: `application/json`,
        method: "POST"
    }
    let selectItem = {
        "discount": props.discounts
    }
    return (
        <>
            <Form
                inputFields={inputFields}
                setInputFields={setInputFields}
                data={data}
                select={selectItem}
            />
        </>
    )
}

PackageAdd.layout = AdminLayout

export async function getServerSideProps(context) {
    let size = 1
    let sort = "sort"
    const res = await axios.get(`${process.env.IP}/api/v1/master/discounts?size=${size}`, {
        withCredentials: true
    })
    const response = await axios.get(`${process.env.IP}/api/v1/master/discounts?size=${res.data.total}&sort=${sort}&fields=id,name`, {
        withCredentials: true
    })
    return {
        props: {
            discounts: response.data.items
        }, // will be passed to the page component as props
    }
}
