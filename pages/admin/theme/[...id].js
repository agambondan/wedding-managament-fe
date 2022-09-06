import AdminLayout from "../../../components/admin";
import {Form} from "../../../components/layout/form/form";
import {useEffect, useRef, useState} from "react";
import {MasterService} from "../../../lib/http";
import {useRouter} from "next/router";
import {Spinner1} from "../../../components/layout/spinner";
import {RichEditor} from "../../../components/layout/form/editor";

export default function ThemeEdit() {
    const router = useRouter()
    const {query} = router
    const [isLoading, setIsLoading] = useState(false)
    const [inputFields, setInputFields] = useState({})
    const editorRef = useRef("");
    const handleChangeWYSIWYG = () => {
        setInputFields({...inputFields, html: editorRef.current.getContent()})
    }
    useEffect(() => {
        setIsLoading(true)

        async function fetch() {
            const request = {
                url: `themes/${query.id[0]}`,
            }
            const theme = await MasterService(request).then(res => {
                return res
            }).catch(err => {
                return err
            })
            if (theme.status !== 200) {
                await router.push("/theme")
            }
            setInputFields({
                ...inputFields, ...{
                    name: theme.data.name,
                    html: theme.data.html,
                    description: theme.data.description,
                }
            })
        }

        fetch().then(() => setIsLoading(false));
    }, [router])
    const data = {
        url: `${process.env.ENDPOINT_MASTER}/themes/${query.id[0]}`,
        redirects: `/admin/theme`,
        module_name: `Theme`,
        title: `Update`,
        content_type: `application/json`,
        method: "PUT"
    }
    if (isLoading) return <Spinner1/>
    return (
        <>
            <Form inputFields={inputFields} setInputFields={setInputFields} data={data}>
                <div className={"py-2 my-1 text-2xl"}>
                    HTML
                </div>
                <RichEditor description={inputFields.html} editorRef={editorRef}
                            handleChange={handleChangeWYSIWYG}/>
            </Form>
        </>
    )
}

ThemeEdit.layout = AdminLayout