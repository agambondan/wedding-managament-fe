import AdminLayout from "../../../../components/Layout/admin";
import {Form} from "../../../../components/layout/form";
import {useState} from "react";
import axios from "axios";

export default function StateProvinceEdit(props) {
    const [inputFields, setInputFields] = useState({
        state_province_code: props.data.state_province_code,
        state_province_name: props.data.state_province_name
    })
    const data = {
        url: `${process.env.IP}/api/v1/master/state-provinces/${props.data.id}`,
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
    const response = await axios.get(`${process.env.IP}/api/v1/master/state-provinces/${context.query.id[0]}`, {
        withCredentials: true
    })
    return {
        props: {
            context: {
                query: context.query
            },
            data: response.data
        }, // will be passed to the page component as props
    }
}
