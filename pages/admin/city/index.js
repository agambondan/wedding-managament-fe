import AdminLayout from "../../../components/Layout/admin";
import {Table} from "../../../components/layout/table";
import axios from "axios";

export default function CityIndex(props) {
    let data = [];
    if (props.data.items.length === 0) {
        const obj = {
            "id": "",
            "no": 0,
            "city_code": "",
            "city_name": "",
            "created_at": "",
            "state_province": "",
            "action": "",
            "state_province_id": "",
        }
        data.push(obj)
    } else {
        data = props.data.items.map((item, index) => {
            let stateProvince = {
                "id": "",
                "state_province_code": "",
                "state_province_name": "",
            }
            if (item.state_province !== undefined) {
                stateProvince = item.state_province
            }
            let date = new Date(item.created_at)
            return {
                "id": item.id,
                "no": item.sort,
                "city_code": item.city_code,
                "city_name": item.city_name,
                "created_at": date.toLocaleString(),
                "state_province": stateProvince.state_province_name,
                "action": "",
                "state_province_id": stateProvince.id,
            }
        })
    }
    return (
        <>
            <Table data={data}/>
        </>
    )
}

CityIndex.layout = AdminLayout

export async function getServerSideProps(context) {
    let size = 10
    let page = 0
    let sort = "sort"
    if (context.query.size !== undefined) {
        size = context.query.size
    }
    if (context.query.page !== undefined) {
        page = context.query.page
    }
    if (context.query.sort !== undefined) {
        sort = context.query.sort
    }
    const response = await axios.get(`${process.env.IP}/api/v1/master/cities?size=${size}&page=${page}&sort=${sort}`, {
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
