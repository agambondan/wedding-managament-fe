import AdminLayout from "../../../components/admin";
import {Form} from "../../../components/layout/form/form";
import {useEffect, useState} from "react";
import {MasterService} from "../../../lib/http";
import {useRouter} from "next/router";
import {Spinner1} from "../../../components/layout/spinner";

export default function NamePrefixAdd(props) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [gender, setGender] = useState([{id: "", gender_name: ""}])
    const [inputFields, setInputFields] = useState({
        "name_prefix_code": "",
        "name_prefix_name": "",
    })
    useEffect(() => {
        setIsLoading(true)

        async function fetch() {
            let size = 10
            let sort = "sort"
            const request = {
                url: `genders?size=${size}`,
            }
            const res = await MasterService(request).then(res => {
                return res
            }).catch(err => {
                return err
            })
            request.url = `genders?size=${res.data.total}&sort=gender_code,gender_name,${sort}&fields=id,gender_name`
            const response = await MasterService(request).then(res => {
                return res
            }).catch(err => {
                return err
            })
            if (response.data.items.length !== 0) {
                setGender([])
            }
            response.data.items.map((item) => {
                setGender((prevState) => [
                    ...prevState, {
                        "id": item.id,
                        "gender_name": item.gender_name
                    },
                ]);
            })
        }

        fetch().then(() => setIsLoading(false));
    }, [router])
    const data = {
        url: `${process.env.ENDPOINT_MASTER}/name-prefixes`,
        redirects: `/admin/name-prefix`,
        module_name: `Name Prefix`,
        title: `Save`,
        content_type: `application/json`,
        method: "POST"
    }
    let selectItem = {
        "gender": gender
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

NamePrefixAdd.layout = AdminLayout