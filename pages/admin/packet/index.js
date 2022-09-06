import AdminLayout from "../../../components/admin";
import {Table} from "../../../components/layout/form/table";
import {MasterService} from "../../../lib/http";
import {useRouter} from "next/router";
import {Spinner1} from "../../../components/layout/spinner";
import {useEffect, useState} from "react";

export default function PacketIndex() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([{
        "id": "",
        "name": "",
        "price": 0,
        "description": "",
        "discount": "",
        "discount_id": "",
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
            url: `packets?size=${size}&page=${page}&sort=${sort}`,
        }

        async function fetch() {
            await MasterService(request).then(res => {
                if (res.data.items.length !== 0) {
                    setData([])
                }
                res.data.items.map((item) => {
                    let discount = {
                        "id": "",
                        "name": "",
                    }
                    if (item.discount !== undefined) {
                        discount = item.discount
                    }
                    let date = new Date(item.created_at)
                    setData((prevData) => [
                        ...prevData,
                        {
                            "id": item.id,
                            "name": item.name,
                            "price": item.price,
                            "description": item.description,
                            "discount": discount.name,
                            "discount_id": discount.id,
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
        redirects: `/admin/packet/add`,
    }
    if (isLoading) return <Spinner1/>
    return (
        <>
            <Table data={data} detail={detail}/>
        </>
    )
}

PacketIndex.layout = AdminLayout