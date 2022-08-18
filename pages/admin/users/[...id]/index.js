import AdminLayout from "../../../../components/Layout/admin";
import {Form} from "../../../../components/layout/form";
import {useState} from "react";
import {MasterService} from "../../../../lib/http";

export default function UserEdit(props) {
    const [inputFields, setInputFields] = useState({
        user_code: props.data.user_code,
        user_name: props.data.user_name,
        state_province_id: props.data.state_province_id
    })
    const data = {
        url: `${process.env.ENDPOINT_MASTER}/${props.data.id}`,
        redirects: `/admin/user`,
        module_name: `User`,
        title: `Update`,
        content_type: `application/json`,
        method: "PUT"
    }
    let selectItem = {
        "state_province": props.provinces
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

UserEdit.layout = AdminLayout

export async function getServerSideProps(context) {
    const {req, query} = context
    let size = 1
    let sort = "sort"
    let request = {
        url: `state-provinces?size=${size}`,
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
    request.url = `${query.id[0]}`
    const user = await MasterService(request)
    request.url = `state-provinces?size=${province.data.total}&sort=state_province_code,state_province_name,${sort}&fields=id,state_province_name`
    const provinces = await MasterService(request)
    return {
        props: {
            data: user.data,
            provinces: provinces.data.items
        }, // will be passed to the page component as props
    }
}
