import AdminLayout from "../../../components/admin";
import {Form} from "../../../components/layout/form/form";
import {useState} from "react";
import {MasterService} from "../../../lib/http";

export default function CityAdd(props) {
    const [inputFields, setInputFields] = useState(
        {city_code: '', city_name: ''}
    )
    const data = {
        url: `${process.env.ENDPOINT_MASTER}/cities`,
        redirects: `/admin/city`,
        module_name: `City`,
        title: `Save`,
        content_type: `application/json`,
        method: "POST"
    }
    let selectItem = {
        "state_province": props.provinces
    }
    return (
        <Form
            inputFields={inputFields}
            setInputFields={setInputFields}
            data={data}
            select={selectItem}
        />
    )
}

CityAdd.layout = AdminLayout

export async function getServerSideProps(context) {
    const {req} = context
    let size = 1
    let sort = "sort"
    let request = {
        url: `state-provinces?size=${size}`,
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
    request.url = `state-provinces?size=${res.data.total}&sort=${sort}&fields=id,state_province_name`
    const response = await MasterService(request)
    return {
        props: {
            provinces: response.data.items
        }, // will be passed to the page component as props
    }
}
