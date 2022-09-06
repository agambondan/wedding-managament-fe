import AdminLayout from "../../../components/admin";
import {Table} from "../../../components/layout/form/table";
import {MasterService} from "../../../lib/http";
import {useRouter} from "next/router";
import {Spinner1} from "../../../components/layout/spinner";
import {useEffect, useState} from "react";

export default function FeatureIndex() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([{
        "id": "",
        "feature_code": "",
        "feature_name": "",
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
            url: `features?size=${size}&page=${page}&sort=${sort}`,
        }

        async function fetch() {
            await MasterService(request).then(res => {
                if (res.data.items.length !== 0) {
                    setData([])
                }
                res.data.items.map((item) => {
                    let date = new Date(item.created_at)
                    setData((prevData) => [
                        ...prevData,
                        {
                            "id": item.id,
                            "feature_code": item.feature_code,
                            "feature_name": item.feature_name,
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
        redirects: `/admin/feature/add`,
    }
    if (isLoading) return <Spinner1/>
    return (
        <>
            <Table data={data} detail={detail}/>
        </>
    )
}

FeatureIndex.layout = AdminLayout