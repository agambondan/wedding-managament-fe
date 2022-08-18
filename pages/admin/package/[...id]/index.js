import AdminLayout from "../../../../components/Layout/admin";
import {Form} from "../../../../components/layout/form";
import {useState} from "react";
import {MasterService} from "../../../../lib/http";

export default function PackageEdit(props) {
    const [inputFields, setInputFields] = useState({
        "name": props.data.name,
        "sku": props.data.sku,
        "price": props.data.price,
        "description": props.data.description,
        "discount_id": props.data.discount_id
    })
    const data = {
        url: `${process.env.ENDPOINT_MASTER}/packages/${props.data.id}`,
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
    const {req, query} = context
    let size = 1
    let sort = "sort"
    let request = {
        url: `discounts?size=${size}`,
        headers: {
            "Cookie": `token=${req.cookies.token}`
        },
    }
    const province = await MasterService(request).then(res => {
        return res
    }).catch(err => {
        return err
    })
    if (province.status !== 200) {
        return {
            redirect: {
                permanent: false,
                destination: '/admin'
            }
        }
    }
    request.url = `cities/${query.id[0]}`
    const city = await MasterService(request)
    request.url = `discounts?size=${province.data.total}&sort=state_province_code,state_province_name,${sort}&fields=id,state_province_name`
    const provinces = await MasterService(request)
    return {
        props: {
            data: city.data,
            provinces: provinces.data.items
        }, // will be passed to the page component as props
    }
}
