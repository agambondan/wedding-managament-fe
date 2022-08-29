import AdminLayout from "../../../../components/admin";
import {Form} from "../../../../components/layout/form/form";
import {useState} from "react";
import {MasterService} from "../../../../lib/http";

export default function PacketEdit(props) {
    const [inputFields, setInputFields] = useState({
        "name": props.data.name,
        "sku": props.data.sku,
        "price": props.data.price,
        "description": props.data.description,
        "discount_id": props.data.discount_id
    })
    const data = {
        url: `${process.env.ENDPOINT_MASTER}/packets/${props.data.id}`,
        redirects: `/admin/packet`,
        module_name: `Packet`,
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

PacketEdit.layout = AdminLayout

export async function getServerSideProps(context) {
    const {req, query} = context
    let size = 1
    let sort = "sort"
    let request = {
        url: `discounts?size=${size}`,
        headers: {
            "Cookie": `token=${req.cookies.token}`
        },
    }
    const discount = await MasterService(request).then(res => {
        return res
    }).catch(err => {
        return err
    })
    if (discount.status !== 200) {
        return {
            redirect: {
                permanent: false,
                destination: '/admin'
            }
        }
    }
    request.url = `packets/${query.id[0]}`
    const city = await MasterService(request)
    request.url = `discounts?size=${discount.data.total}&sort=${sort}&fields=id,name`
    const provinces = await MasterService(request)
    return {
        props: {
            data: city.data,
            discounts: provinces.data.items
        }, // will be passed to the page component as props
    }
}
