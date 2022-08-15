import AdminLayout from "../../../../components/Layout/admin";
import {Form} from "../../../../components/layout/form";
import {useState} from "react";
import axios from "axios";

export default function PackageEdit(props) {
    const [inputFields, setInputFields] = useState({
        "name": props.data.name,
        "sku": props.data.sku,
        "price": props.data.price,
        "description": props.data.description,
        "discount_id": props.data.discount_id
    })
    const data = {
        url: `${process.env.IP}/api/v1/master/packages/${props.data.id}`,
        redirects: `/admin/package`,
        module_name: `Package`,
        title: `Update`,
        content_type: `application/json`,
        method: "PUT"
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

PackageEdit.layout = AdminLayout


export async function getServerSideProps(context) {
    let size = 1
    let sort = "sort"
    const [discount, packages] = await Promise.all([
        axios.get(`${process.env.IP}/api/v1/master/discounts?size=${size}`, {
            withCredentials: true
        }),
        axios.get(`${process.env.IP}/api/v1/master/packages/${context.query.id[0]}`, {
            withCredentials: true
        })
    ])
    const discounts = await axios.get(`${process.env.IP}/api/v1/master/discounts?size=${discount.data.total}&sort=name,${sort}&fields=id,name`, {
        withCredentials: true
    })
    return {
        props: {
            context: {
                query: context.query
            },
            data: packages.data,
            discounts: discounts.data.items
        }, // will be passed to the page component as props
    }
}
