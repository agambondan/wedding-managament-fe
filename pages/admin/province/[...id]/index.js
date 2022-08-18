import AdminLayout from "../../../../components/Layout/admin";
import {Form} from "../../../../components/layout/form";
import {useState} from "react";
import {MasterService} from "../../../../lib/http";

export default function StateProvinceEdit(props) {
    const [inputFields, setInputFields] = useState({
        state_province_code: props.data.state_province_code,
        state_province_name: props.data.state_province_name
    })
    const data = {
        url: `${process.env.ENDPOINT_MASTER}/state-provinces/${props.data.id}`,
        redirects: `/admin/province`,
        module_name: `StateProvince`,
        title: `Update`,
        content_type: `application/json`,
        method: "PUT"
    }
    return (
        <>
            <Form
                inputFields={inputFields}
                setInputFields={setInputFields}
                data={data}
            />
        </>
    )
}

StateProvinceEdit.layout = AdminLayout

export async function getServerSideProps(context) {
    const {req, query} = context
    let request = {
        url: `state-provinces/${query.id[0]}`,
        headers: {
            "Cookie": `token=${req.cookies.token}`
        },
    }
    const response = await MasterService(request).then(res => {
        return res
    }).catch(err => {
        return err
    })
    if (response.status !== 200) {
        return {
            redirect: {
                permanent: false,
                destination: '/admin'
            }
        }
    }
    return {
        props: {
            context: {
                query: context.query
            },
            data: response.data
        }, // will be passed to the page component as props
    }
}