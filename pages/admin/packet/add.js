import AdminLayout from "../../../components/admin";
import {Form} from "../../../components/layout/form/form";
import {useEffect, useState} from "react";
import {MasterService} from "../../../lib/http";
import {useRouter} from "next/router";
import {Spinner1} from "../../../components/layout/spinner";

export default function PacketAdd() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [discount, setDiscount] = useState([{id: "", name: ""}])
    const [inputFields, setInputFields] = useState({
        "name": "",
        "price": "",
        "description": "",
    })
    useEffect(() => {
        setIsLoading(true)

        async function fetch() {
            let size = 10
            let sort = "sort"
            const request = {
                url: `discounts?size=${size}`,
            }
            const res = await MasterService(request).then(res => {
                return res
            }).catch(err => {
                return err
            })
            request.url = `discounts?size=${res.data.total}&sort=name,${sort}&fields=id,name`
            const response = await MasterService(request).then(res => {
                return res
            }).catch(err => {
                return err
            })
            if (response.data.items.length !== 0) {
                setDiscount([])
            }
            response.data.items.map((item) => {
                setDiscount((prevState) => [
                    ...prevState, {
                        "id": item.id,
                        "name": item.name
                    },
                ]);
            })
        }

        fetch().then(() => setIsLoading(false));
    }, [router])
    const data = {
        url: `${process.env.ENDPOINT_MASTER}/packets`,
        redirects: `/admin/packet`,
        module_name: `Packet`,
        title: `Save`,
        content_type: `application/json`,
        method: "POST"
    }
    let selectItem = {
        "discount": discount
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

PacketAdd.layout = AdminLayout