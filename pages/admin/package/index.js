import AdminLayout from "../../../components/Layout/admin";
import {Table} from "../../../components/layout/table";
import {MasterService} from "../../../lib/http";

export default function PackageIndex(props) {
    let data = [];
    if (props.data.items.length === 0) {
        const obj = {
            "id": "dummy",
            "name": "",
            "sku": "",
            "price": 0,
            "description": "",
            "discount": "",
            "discount_id": "",
            "created_at": "",
            "action": "",
        }
        data.push(obj)
    } else {
        data = props.data.items.map((item, index) => {
            let discount = {
                "id": "",
                "name": "",
            }
            if (item.discount !== undefined) {
                discount = item.discount
            }
            let date = new Date(item.created_at)
            return {
                "id": item.id,
                "name": item.name,
                "sku": item.sku,
                "price": item.price,
                "description": item.description,
                "discount": discount.name,
                "discount_id": discount.id,
                "created_at": date.toLocaleString(),
                "action": "",
            }
        })
    }
    const detail = {
        redirects: `/admin/package/add`,
    }
    return (
        <>
            <Table data={data} detail={detail}/>
        </>
    )
}

PackageIndex.layout = AdminLayout

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
        url: `packages?size=${size}&page=${page}&sort=${sort}`,
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
