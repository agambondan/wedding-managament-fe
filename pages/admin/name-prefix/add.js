import AdminLayout from "../../../components/admin";
import {Form} from "../../../components/layout/form/form";
import {useState} from "react";
import {MasterService} from "../../../lib/http";

export default function NamePrefixAdd(props) {
    const [inputFields, setInputFields] = useState({
        "name_prefix_code": "",
        "name_prefix_name": "",
    })
    const data = {
        url: `${process.env.ENDPOINT_MASTER}/name-prefixes`,
        redirects: `/admin/name-prefix`,
        module_name: `NamePrefix`,
        title: `Save`,
        content_type: `application/json`,
        method: "POST"
    }
    let selectItem = {
        "gender": props.gender
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

NamePrefixAdd.layout = AdminLayout

export async function getServerSideProps(context) {
    const {req} = context
    let size = 1
    let sort = "sort"
    let request = {
        url: `genders?size=${size}`,
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
    request.url = `genders?size=${res.data.total}&sort=${sort}&fields=id,gender_name`
    const response = await MasterService(request)
    return {
        props: {
            gender: response.data.items
        }, // will be passed to the page component as props
    }
}