import AdminLayout from "../../../components/admin";
import {Form} from "../../../components/layout/form/form";
import {useEffect, useState} from "react";
import {MasterService} from "../../../lib/http";
import {useRouter} from "next/router";
import {Spinner1} from "../../../components/layout/spinner";

export default function GenderEdit() {
    const router = useRouter()
    const {query} = router
    const [isLoading, setIsLoading] = useState(false)
    const [inputFields, setInputFields] = useState({})
    useEffect(() => {
        setIsLoading(true)

        async function fetch() {
            const request = {
                url: `genders/${query.id[0]}`,
            }
            const gender = await MasterService(request).then(res => {
                return res
            }).catch(err => {
                return err
            })
            if (gender.status !== 200) {
                await router.push("/gender")
            }
            setInputFields({
                ...inputFields, ...{
                    "gender_code": gender.data.gender_code,
                    "gender_name": gender.data.gender_name,
                }
            })
        }

        fetch().then(() => setIsLoading(false));
    }, [router])
    const data = {
        url: `${process.env.ENDPOINT_MASTER}/genders/${query.id[0]}`,
        redirects: `/admin/gender`,
        module_name: `Gender`,
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

GenderEdit.layout = AdminLayout