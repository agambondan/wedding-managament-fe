import AdminLayout from "../../../components/Layout/admin";
import {Table} from "../../../components/layout/table";
import axios from "axios";

export default function EventIndex(props) {
    let data = [];
    if (props.data.items.length === 0) {
        const obj = {
            "id": "dummy",
            "event_code": "",
            "event_name": "",
            "short_description": "",
            "description": "",
            "created_at": "",
            "action": "",
        }
        data.push(obj)
    } else {
        data = props.data.items.map((item, index) => {
            let date = new Date(item.created_at)
            return {
                "id": item.id,
                "event_code": item.event_code,
                "event_name": item.event_name,
                "short_description": item.short_description,
                "description": item.description,
                "created_at": date.toLocaleString(),
                "action": "",
            }
        })
    }
    const detail = {
        redirects: `/admin/event/add`,
    }
    return (
        <>
            <Table data={data} detail={detail}/>
        </>
    )
}

EventIndex.layout = AdminLayout

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
    const response = await axios.get(`${process.env.IP}/api/v1/master/events?size=${size}&page=${page}&sort=${sort}`, {
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
