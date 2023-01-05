import ClientLayout from "../../components/client";
import {useEffect, useState} from "react";
import {FormModal} from "../../components/layout/form/modal";
import {CardProfileHalfWidth} from "../../components/layout/card";
import {useRouter} from "next/router";
import {Spinner1} from "../../components/layout/spinner";
import {MasterService} from "../../lib/http";

export default function Profile() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [stateProvince, setStateProvince] = useState([{id: "", state_province_name: ""}])
    const [city, setCity] = useState([{id: "", city_name: ""}])
    const [click, setClick] = useState(false)
    const [click1, setClick1] = useState(false)
    const [inputMan, setInputMan] = useState(
        {name: "", gender: "", parents_name: "", nickname: ""}
    )
    const [inputWoman, setInputWoman] = useState(
        {name: "", gender: "", parents_name: "", nickname: ""}
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
            request.url = `cities?size=${size}`
            const res1 = await MasterService(request).then(res => {
                return res
            }).catch(err => {
                return err
            })
            request.url = `cities?size=${res1.data.total}&sort=city_code,city_name,${sort}&fields=id,city_name`
            const response1 = await MasterService(request).then(res => {
                return res
            }).catch(err => {
                return err
            })
            if (response1.data.items.length !== 0) {
                setCity([])
            }
            response.data.items.map((item) => {
                setCity((prevState) => [
                    ...prevState, {
                        "id": item.id,
                        "city_name": item.city_name
                    },
                ]);
            })
        }

        fetch().then(() => setIsLoading(false));
    }, [router])
    const data = {
        url: `${process.env.ENDPOINT_MASTER}/cities`, // TODO
        redirects: `/client/profile`,
        module_name: `Profile`,
        title: `Save`,
        content_type: `application/json`,
        method: "POST"
    }
    let selectItem = {
        "state_province": stateProvince,
        "city": city
    }
    if (isLoading) return <Spinner1/>
    return (
        <>
            {click ? <FormModal
                inputFields={inputMan}
                setInputFields={setInputMan}
                data={data}
                select={selectItem} title={"Mempelai Pria"}
                setClick={setClick}/> : ""}
            {click1 ? <FormModal
                inputFields={inputWoman}
                setInputFields={setInputWoman()}
                select={selectItem}
                data={data} title={"Mempelai Wanita"}
                setClick={setClick1}/> : ""}
            <div className={"flex space-x-9"}>
                <CardProfileHalfWidth title={"Mempelai Pria"} setClick={setClick} click={click}/>
                <CardProfileHalfWidth title={"Mempelai Wanita"} setClick={setClick1} click={click1}/>
            </div>
        </>
    )
}


Profile.layout = ClientLayout