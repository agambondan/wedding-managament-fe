import AdminLayout from "../../../components/admin";
import {Form} from "../../../components/layout/form/form";
import {useEffect, useState} from "react";
import {MasterService} from "../../../lib/http";
import {useRouter} from "next/router";
import {Spinner1} from "../../../components/layout/spinner";

export default function MultimediaTypeEdit() {
    const router = useRouter()
    const {query} = router
    const [isLoading, setIsLoading] = useState(false)
    const [inputFields, setInputFields] = useState({})
    useEffect(() => {
        setIsLoading(true)

        async function fetch() {
            const request = {
                url: `multimedia-types/${query.id[0]}`,
            }
            const multimediaType = await MasterService(request).then(res => {
                return res
            }).catch(err => {
                return err
            })
            if (multimediaType.status !== 200) {
                await router.push("/multimedia-type")
            }
            setInputFields({
                ...inputFields, ...{
                    "name": multimediaType.data.name,
                    "slug": multimediaType.data.slug,
                }
            })
        }

        fetch().then(() => setIsLoading(false));
    }, [router])
    const data = {
        url: `${process.env.ENDPOINT_MASTER}/multimedia-types/${query.id[0]}`,
        redirects: `/admin/multimedia-type`,
        module_name: `Multimedia Type`,
        title: `Update`,
        content_type: `application/json`,
        method: "PUT"
    }
    if (isLoading) return <Spinner1/>
    return (
        <>
            <Form
                inputFields={inputFields}
                setInputFields={setInputFields}
                data={data}
            />
        </>
    )
}

MultimediaTypeEdit.layout = AdminLayout