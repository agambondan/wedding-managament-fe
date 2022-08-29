import AdminLayout from "../../../components/admin";
import {Table} from "../../../components/layout/form/table";
import {MasterService} from "../../../lib/http";

export default function NamePrefixIndex(props) {
    let data = [];
    if (props.data.items.length === 0) {
        const obj = {
            "id": "dummy",
            "name_prefix_code": "",
            "name_prefix_name": "",
            "created_at": "",
            "gender": "",
            "action": "",
            "gender_id": ""
        }
        data.push(obj)
    } else {
        data = props.data.items.map((item) => {
            let gender = {
                "id": "",
                "gender_name": "",
            }
            if (item.gender !== undefined) {
                gender = item.gender
            }
            let date = new Date(item.created_at)
            return {
                "id": item.id,
                "name_prefix_code": item.name_prefix_code,
                "name_prefix_name": item.name_prefix_name,
                "created_at": date.toLocaleString(),
                "gender": gender.gender_name,
                "action": "",
                "gender_id": gender.id
            }
        })
    }
    const detail = {
        redirects: `/admin/name-prefix/add`,
    }
    return (
        <>
            <Table data={data} detail={detail}/>
        </>
    )
}

NamePrefixIndex.layout = AdminLayout

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
        url: `name-prefixes?size=${size}&page=${page}&sort=${sort}`,
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
