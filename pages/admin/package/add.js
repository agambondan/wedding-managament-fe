import AdminLayout from "../../../components/Layout/admin";
import {Form} from "../../../components/layout/form";
import {useState} from "react";
import {MasterService} from "../../../lib/http";

export default function PackageAdd(props) {
    const [inputFields, setInputFields] = useState({
            "name": "",
            "sku": "",
            "price": 0,
            "description": "",
        }
    )
    const data = {
        url: `${process.env.ENDPOINT_MASTER}/packages`,
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
    const {req} = context
    let size = 1
    let sort = "sort"
    let request = {
        url: `discounts?size=${size}`,
        headers: {
            "Cookie": `token=${req.cookies.token}`
        },
    }
    const res = await MasterService(request).then(res => {
        return res
    }).catch(err => {
        return err
    })
    if (res.status !== 200) {
        return {
            redirect: {
                permanent: false,
                destination: '/admin'
            }
        }
    }
    request.url = `discounts?size=${res.data.total}&sort=${sort}&fields=id,state_province_name`
    const response = await MasterService(request)
    return {
        props: {
            provinces: response.data.items
        }, // will be passed to the page component as props
    }
}
