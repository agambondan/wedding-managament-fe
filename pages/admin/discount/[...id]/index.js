import AdminLayout from "../../../../components/Layout/admin";
import {Form} from "../../../../components/layout/form";
import {useState} from "react";
import {MasterService} from "../../../../lib/http";

export default function DiscountEdit(props) {
    const [inputFields, setInputFields] = useState({
        name: props.data.name,
        description: props.data.description,
        percent: props.data.percent,
        is_active: props.data.is_active
    })
    const data = {
        url: `${process.env.ENDPOINT_MASTER}/discounts/${props.data.id}`,
        redirects: `/admin/discount`,
        module_name: `Discount`,
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

DiscountEdit.layout = AdminLayout


export async function getServerSideProps(context) {
    const {req, query} = context
    let request = {
        url: `discounts/${query.id[0]}`,
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
