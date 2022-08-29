import AdminLayout from "../../../components/admin";
import {Table} from "../../../components/layout/form/table";
import {MasterService} from "../../../lib/http";

export default function CityIndex(props) {
    let data = [];
    if (props.data.items.length === 0) {
        const obj = {
            "id": "dummy",
            "city_code": "",
            "city_name": "",
            "created_at": "",
            "state_province": "",
            "action": "",
            "state_province_id": "",
        }
        data.push(obj)
    } else {
        data = props.data.items.map((item) => {
            let stateProvince = {
                "id": "",
                "state_province_name": "",
            }
            if (item.state_province !== undefined) {
                stateProvince = item.state_province
            }
            let date = new Date(item.created_at)
            return {
                "id": item.id,
                "city_code": item.city_code,
                "city_name": item.city_name,
                "created_at": date.toLocaleString(),
                "state_province": stateProvince.state_province_name,
                "action": "",
                "state_province_id": stateProvince.id,
            }
        })
    }
    const detail = {
        redirects: `/admin/city/add`,
    }
    return (
        <>
            <Table data={data} detail={detail}/>
        </>
    )
}

CityIndex.layout = AdminLayout

export async function getServerSideProps(context) {
    const {
        req,
        query,
    } = context
    let size = 10
    let page = 0
    let sort = "sort"
    if (query.size !== undefined) {
        size = query.size
    }
    if (query.page !== undefined) {
        page = query.page
    }
    if (query.sort !== undefined) {
        sort = query.sort
    }
    const request = {
        url: `cities?size=${size}&page=${page}&sort=${sort}`,
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
            data: response.data
        }, // will be passed to the page component as props
    }
}
