import AdminLayout from "../../../components/admin";
import {Table} from "../../../components/layout/form/table";
import {AxiosInstance, MasterService} from "../../../lib/http";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export default function DiscountIndex(props) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([{
        "id": "dummy",
        "name": "",
        "description": "",
        "percent": 0,
        "is_active": false,
        "created_at": "",
        "action": "",
    }])
    useEffect(() => {
        setIsLoading(true)
        const {query} = router
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
            url: `discounts?size=${size}&page=${page}&sort=${sort}`,
        }

        async function fetch() {
            await MasterService(request).then(res => {
                setData([])
                res.data.items.map((item) => {
                    let date = new Date(item.created_at)
                    setData((prevData) => [
                        ...prevData,
                        {
                            "id": item.id,
                            "name": item.name,
                            "description": item.description,
                            "percent": item.percent,
                            "is_active": item.is_active,
                            "created_at": date.toLocaleString(),
                            "action": "",
                        },
                    ]);
                })
                return res
            }).catch(err => {
                return err
            })
        }

        fetch().then(() => setIsLoading(false));
    }, [router])
    const detail = {
        redirects: `/admin/discount/add`,
    }
    if (isLoading) return <p>Loading...</p>
    return (
        <Table data={data} detail={detail}/>
    )
}

DiscountIndex.layout = AdminLayout
