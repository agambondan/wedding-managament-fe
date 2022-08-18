import AdminLayout from "../../../components/Layout/admin";
import {Form} from "../../../components/layout/form";
import {MasterService} from "../../../lib/http";
import {useState} from "react";

export default function UserAdd(props) {
    const [inputFields, setInputFields] = useState(
        {user_code: '', user_name: ''}
    )
    const data = {
        url: `${process.env.ENDPOINT_MASTER}`,
        redirects: `/admin/user`,
        module_name: `User`,
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

UserAdd.layout = AdminLayout

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
