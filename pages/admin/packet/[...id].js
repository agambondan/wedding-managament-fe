import AdminLayout from "../../../components/admin";
import {Form} from "../../../components/layout/form/form";
import {useEffect, useState} from "react";
import {MasterService} from "../../../lib/http";
import {useRouter} from "next/router";
import {Spinner1} from "../../../components/layout/spinner";

export default function PacketEdit() {
    const router = useRouter()
    const {query} = router
    const [isLoading, setIsLoading] = useState(false)
    const [discount, setDiscount] = useState([{id: "", name: ""}])
    const [inputFields, setInputFields] = useState({})
    useEffect(() => {
        setIsLoading(true)

        async function fetch() {
            let size = 10
            let sort = "sort"
            const request = {
                url: `packets/${query.id[0]}`,
            }
            const packet = await MasterService(request).then(res => {
                return res
            }).catch(err => {
                return err
            })
            if (packet.status !== 200) {
                await router.push("/packet")
            }
            setInputFields({
                ...inputFields, ...{
                    "name": packet.data.name,
                    "price": packet.data.price,
                    "description": packet.data.description,
                    "discount_id": packet.data.discount_id
                }
            })
            request.url = `discounts?size=${size}`
            const discount = await MasterService(request).then(res => {
                return res
            }).catch(err => {
                return err
            })
            request.url = `discounts?size=${discount.data.total}&sort=name,${sort}&fields=id,name`
            const discounts = await MasterService(request).then(res => {
                return res
            }).catch(err => {
                return err
            })
            if (discounts.data.items.length !== 0) {
                setDiscount([])
            }
            discounts.data.items.map((item) => {
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
        url: `${process.env.ENDPOINT_MASTER}/packets/${query.id[0]}`,
        redirects: `/admin/packet`,
        module_name: `Packet`,
        title: `Update`,
        content_type: `application/json`,
        method: "PUT"
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

PacketEdit.layout = AdminLayout