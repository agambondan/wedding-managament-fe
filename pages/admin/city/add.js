import AdminLayout from "../../../components/Layout/admin";
import {Form} from "../../../components/layout/form";
import {useState} from "react";
import axios from "axios";

export default function CityAdd(props) {
    const [inputFields, setInputFields] = useState(
        {city_code: '', city_name: ''}
    )
    const data = {
        url: `${process.env.IP}/api/v1/master/cities`,
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
    let size = 1
    let sort = "sort"
    const res = await axios.get(`${process.env.IP}/api/v1/master/state-provinces?size=${size}`, {
        withCredentials: true
    })
    const response = await axios.get(`${process.env.IP}/api/v1/master/state-provinces?size=${res.data.total}&sort=${sort}&fields=id,state_province_name`, {
        withCredentials: true
    })
    return {
        props: {
            provinces: response.data.items
        }, // will be passed to the page component as props
    }
}
