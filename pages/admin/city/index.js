import AdminLayout from "../../../components/admin";
import {Table} from "../../../components/layout/form/table";
import {MasterService} from "../../../lib/http";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Spinner1} from "../../../components/layout/spinner";

export default function CityIndex() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([{
        "id": "dummy",
        "city_code": "",
        "city_name": "",
        "created_at": "",
        "state_province": "",
        "action": "",
        "state_province_id": "",
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
            url: `cities?size=${size}&page=${page}&sort=${sort}`,
        }

        async function fetch() {
            await MasterService(request).then(res => {
                if (res.data.items.length !== 0) {
                    setData([])
                }
                res.data.items.map((item) => {
                    let stateProvince = {
                        "id": "",
                        "state_province_name": "",
                    }
                    if (item.state_province !== undefined) {
                        stateProvince = item.state_province
                    }
                    let date = new Date(item.created_at)
                    setData((prevData) => [
                        ...prevData,
                        {
                            "id": item.id,
                            "city_code": item.city_code,
                            "city_name": item.city_name,
                            "created_at": date.toLocaleString(),
                            "state_province": stateProvince.state_province_name,
                            "action": "",
                            "state_province_id": stateProvince.id,
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
        redirects: `/admin/city/add`,
    }
    if (isLoading) return <Spinner1/>

    return (
        <Table data={data} detail={detail}/>
    )
}

CityIndex.layout = AdminLayout