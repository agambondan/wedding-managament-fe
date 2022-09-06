import AdminLayout from "../../../components/admin";
import {Form} from "../../../components/layout/form/form";
import {useEffect, useState} from "react";
import {MasterService} from "../../../lib/http";
import {useRouter} from "next/router";
import {Spinner1} from "../../../components/layout/spinner";

export default function CityEdit(props) {
    const router = useRouter()
    const {query} = router
    const [isLoading, setIsLoading] = useState(false)
    const [stateProvince, setStateProvince] = useState([{id: "", state_province_name: ""}])
    const [inputFields, setInputFields] = useState({})
    useEffect(() => {
        setIsLoading(true)

        async function fetch() {
            let size = 10
            let sort = "sort"
            const request = {
                url: `cities/${query.id[0]}`,
            }
            const city = await MasterService(request).then(res => {
                return res
            }).catch(err => {
                return err
            })
            if (city.status !== 200) {
                await router.push("/city")
            }
            setInputFields({
                ...inputFields, ...{
                    "city_code": city.data.city_code,
                    "city_name": city.data.city_name,
                    "state_province_id": city.data.state_province_id,
                }
            })
            request.url = `state-provinces?size=${size}`
            const province = await MasterService(request).then(res => {
                return res
            }).catch(err => {
                return err
            })
            request.url = `state-provinces?size=${province.data.total}&sort=state_province_code,state_province_name,${sort}&fields=id,state_province_name`
            const provinces = await MasterService(request).then(res => {
                return res
            }).catch(err => {
                return err
            })
            if (provinces.data.items.length !== 0) {
                setStateProvince([])
            }
            provinces.data.items.map((item) => {
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
        url: `${process.env.ENDPOINT_MASTER}/cities/${query.id[0]}`,
        redirects: `/admin/city`,
        module_name: `City`,
        title: `Update`,
        content_type: `application/json`,
        method: "PUT"
    }
    let selectItem = {
        "state_province": stateProvince
    }
    if (isLoading) return <Spinner1/>
    return (
        <>
            <Form
                inputFields={inputFields}
                setInputFields={setInputFields}
                data={data}
                select={selectItem}
            />
        </>
    )
}

CityEdit.layout = AdminLayout