import AdminLayout from "../../../components/admin";
import {Table} from "../../../components/layout/form/table";
import {AxiosInstance, MasterService} from "../../../lib/http";

export default function DiscountIndex(props) {
    let data = [];
    if (props.data.items.length === 0) {
        const obj = {
            "id": "dummy",
            "name": "",
            "description": "",
            "percent": 0,
            "is_active": false,
            "created_at": "",
            "action": "",
        }
        data.push(obj)
    } else {
        data = props.data.items.map((item) => {
            let date = new Date(item.created_at)
            return {
                "id": item.id,
                "name": item.name,
                "description": item.description,
                "percent": item.percent,
                "is_active": item.is_active,
                "created_at": date.toLocaleString(),
                "action": "",
            }
        })
    }
    const detail = {
        redirects: `/admin/discount/add`,
    }
    return (
        <>
            <Table data={data} detail={detail}/>
        </>
    )
}

DiscountIndex.layout = AdminLayout

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
    const response = await AxiosInstance({
        url: `${process.env.ENDPOINT_MASTER}/discounts?size=${size}&page=${page}&sort=${sort}`
    }).then(res => {
        return res
    }).catch(err => {
        if (err.response) {
            return err.response
        } else if (err.request) {
            return err.request
        } else {
            return err.message
        }
    })
    if (response.status !== 200) {
        return {
            // redirect: {
            //     permanent: false,
            //     destination: '/admin'
            // }
            props: {
                // cookies: req.cookies,
                data: `${process.env.ENDPOINT_MASTER}/discounts?size=${size}&page=${page}&sort=${sort}`
            }
        }
    }
    return {
        props: {
            data: response.data
        }, // will be passed to the page component as props
    }
}
