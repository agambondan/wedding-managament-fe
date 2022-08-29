import AdminLayout from "../../../components/admin";
import {Table} from "../../../components/layout/form/table";
import {MasterService} from "../../../lib/http";

export default function GenderIndex(props) {
    let data = [];
    if (props.data.items.length === 0) {
        const obj = {
            "id": "dummy",
            "gender_code": 0,
            "gender_name": "",
            "created_at": "",
            "action": "",
        }
        data.push(obj)
    } else {
        data = props.data.items.map((item) => {
            let date = new Date(item.created_at)
            return {
                "id": item.id,
                "gender_code": item.gender_code,
                "gender_name": item.gender_name,
                "created_at": date.toLocaleString(),
                "action": "",
            }
        })
    }
    const detail = {
        redirects: `/admin/gender/add`,
    }
    return (
        <>
            <Table data={data} detail={detail}/>
        </>
    )
}

GenderIndex.layout = AdminLayout

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
        url: `genders?size=${size}&page=${page}&sort=${sort}`,
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
