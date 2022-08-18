import AdminLayout from "../../../components/Layout/admin";
import {Table} from "../../../components/layout/table";
import {MasterService} from "../../../lib/http";

export default function FeatureIndex(props) {
    let data = [];
    if (props.data.items.length === 0) {
        const obj = {
            "id": "dummy",
            "feature_code": "",
            "feature_name": "",
            "created_at": "",
            "action": "",
        }
        data.push(obj)
    } else {
        data = props.data.items.map((item, index) => {
            let date = new Date(item.created_at)
            return {
                "id": item.id,
                "feature_code": item.feature_code,
                "feature_name": item.feature_name,
                "created_at": date.toLocaleString(),
                "action": "",
            }
        })
    }
    const detail = {
        redirects: `/admin/feature/add`,
    }
    return (
        <>
            <Table data={data} detail={detail}/>
        </>
    )
}

FeatureIndex.layout = AdminLayout

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
        url: `features?size=${size}&page=${page}&sort=${sort}`,
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
