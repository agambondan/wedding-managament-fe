import AdminLayout from "../../../../components/admin";
import {Form} from "../../../../components/layout/form/form";
import {useState} from "react";
import {MasterService} from "../../../../lib/http";

export default function ReligionEdit(props) {
    const [inputFields, setInputFields] = useState({
        "religion_code": props.data.religion_code,
        "religion_name": props.data.religion_name,
    })
    const data = {
        url: `${process.env.ENDPOINT_MASTER}/religions/${props.data.id}`,
        redirects: `/admin/religion`,
        module_name: `Religion`,
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

ReligionEdit.layout = AdminLayout

export async function getServerSideProps(context) {
    const {req, query} = context
    let request = {
        url: `religions/${query.id[0]}`,
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
