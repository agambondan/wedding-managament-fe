import AdminLayout from "../../../components/admin";
import {Table} from "../../../components/layout/form/table";
import {MasterService} from "../../../lib/http";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export default function CityIndex() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    let data = []
    data.push({
        "id": "dummy",
        "city_code": "",
        "city_name": "",
        "created_at": "",
        "state_province": "",
        "action": "",
        "state_province_id": "",
    })
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
            url: `cities?size=${size}&page=${page}&sort=${sort}`,
        }
        (async () => {
            await MasterService(request).then(res => {
                const cities = res.data.items.map((item) => {
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
                data.push(cities)
                return res
            }).catch(err => err)
        })();
        setIsLoading(false)
    }, [data, router])
    const detail = {
        redirects: `/admin/city/add`,
    }
    if (isLoading) return <p>Loading...</p>
    return (
        <Table data={data} detail={detail}/>
    )
}

CityIndex.layout = AdminLayout