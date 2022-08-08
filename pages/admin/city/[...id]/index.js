import AdminLayout from "../../../../components/Layout/admin";
import {Form} from "../../../../components/layout/form";
import {useState} from "react";
import axios from "axios";

export default function CityEdit(props) {
    const [inputFields, setInputFields] = useState({
        city_code: props.data.city_code,
        city_name: props.data.city_name,
        state_province_id: props.data.state_province_id
    })
    const data = {
        url: `${process.env.IP}/api/v1/master/cities/${props.data.id}`,
        redirects: `/admin/city`,
        module_name: `City`,
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

CityEdit.layout = AdminLayout


export async function getServerSideProps(context) {
    let size = 1
    let sort = "sort"
    const [province, city] = await Promise.all([
        axios.get(`${process.env.IP}/api/v1/master/state-provinces?size=${size}`, {
            withCredentials: true
        }),
        axios.get(`${process.env.IP}/api/v1/master/cities/${context.query.id[0]}`, {
            withCredentials: true
        })
    ])
    const provinces = await axios.get(`${process.env.IP}/api/v1/master/state-provinces?size=${province.data.total}&sort=state_province_code,state_province_name&fields=id,state_province_name`, {
        withCredentials: true
    })
    return {
        props: {
            context: {
                query: context.query
            },
            data: city.data,
            provinces: provinces.data.items
        }, // will be passed to the page component as props
    }
}
