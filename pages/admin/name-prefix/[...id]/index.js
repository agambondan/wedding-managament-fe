import AdminLayout from "../../../../components/admin";
import {Form} from "../../../../components/layout/form/form";
import {useState} from "react";
import {MasterService} from "../../../../lib/http";

export default function NamePrefixEdit(props) {
    const [inputFields, setInputFields] = useState({
        "name_prefix_code": props.data.name_prefix_code,
        "name_prefix_name": props.data.name_prefix_name,
        "gender_id": props.data.gender_id
    })
    const data = {
        url: `${process.env.ENDPOINT_MASTER}/name-prefixs/${props.data.id}`,
        redirects: `/admin/name-prefix`,
        module_name: `NamePrefix`,
        title: `Update`,
        content_type: `application/json`,
        method: "PUT"
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

NamePrefixEdit.layout = AdminLayout

export async function getServerSideProps(context) {
    const {req, query} = context
    let size = 1
    let sort = "sort"
    let request = {
        url: `genders?size=${size}`,
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
    request.url = `name-prefixes/${query.id[0]}`
    const city = await MasterService(request)
    request.url = `genders?size=${province.data.total}&sort=${sort}&fields=id,gender_name`
    const gender = await MasterService(request)
    return {
        props: {
            data: city.data,
            gender: gender.data.items
        }, // will be passed to the page component as props
    }
}

