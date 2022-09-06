import AdminLayout from "../../../components/admin";
import {Form} from "../../../components/layout/form/form";
import {useEffect, useState} from "react";
import {MasterService} from "../../../lib/http";
import {useRouter} from "next/router";
import {Spinner1} from "../../../components/layout/spinner";

export default function CityAdd() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [stateProvince, setStateProvince] = useState([{id: "", state_province_name: ""}])
    const [inputFields, setInputFields] = useState(
        {city_code: '', city_name: ''}
    )
    useEffect(() => {
        setIsLoading(true)

        async function fetch() {
            let size = 10
            let sort = "sort"
            const request = {
                url: `state-provinces?size=${size}`,
            }
            const res = await MasterService(request).then(res => {
                return res
            }).catch(err => {
                return err
            })
            request.url = `state-provinces?size=${res.data.total}&sort=state_province_code,state_province_name,${sort}&fields=id,state_province_name`
            const response = await MasterService(request).then(res => {
                return res
            }).catch(err => {
                return err
            })
            if (response.data.items.length !== 0) {
                setStateProvince([])
            }
            response.data.items.map((item) => {
                setStateProvince((prevState) => [
                    ...prevState, {
                        "id": item.id,
                        "state_province_name": item.state_province_name
                    },
                ]);
            })
        }

        fetch().then(() => setIsLoading(false));
    }, [router])
    const data = {
        url: `${process.env.ENDPOINT_MASTER}/cities`,
        redirects: `/admin/city`,
        module_name: `City`,
        title: `Save`,
        content_type: `application/json`,
        method: "POST"
    }
    let selectItem = {
        "state_province": stateProvince
    }
    if (isLoading) return <Spinner1/>
    return (
        <Form
            inputFields={inputFields}
            setInputFields={setInputFields}
            data={data}
            select={selectItem}
        />
    )
}

CityAdd.layout = AdminLayout