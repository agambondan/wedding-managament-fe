import AdminLayout from "../../../components/admin";
import {Form} from "../../../components/layout/form/form";
import {useState} from "react";
import {MasterService} from "../../../lib/http";

export default function PacketAdd(props) {
    const [inputFields, setInputFields] = useState({
            "name": "",
            "sku": "",
            "price": 0,
            "description": "",
        }
    )
    const data = {
        url: `${process.env.ENDPOINT_MASTER}/packets`,
        redirects: `/admin/packet`,
        module_name: `Packet`,
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

PacketAdd.layout = AdminLayout

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
    request.url = `discounts?size=${res.data.total}&sort=${sort}&fields=id,name`
    const response = await MasterService(request)
    return {
        props: {
            discounts: response.data.items
        }, // will be passed to the page component as props
    }
}
