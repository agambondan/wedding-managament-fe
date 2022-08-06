import AdminLayout from "../../../components/Layout/admin";
import {ObjectForm} from "../../../components/layout/form";
import {useState} from "react";

export default function CityAdd() {
    const [inputFields, setInputFields] = useState(
        {city_code: '', city_name: ''}
    )
    const data = {
        url: `${process.env.IP}/api/v1/master/cities`,
        redirects: `/admin/city`,
        module_name: `City`,
        title: `Save`,
        content_type: `application/json`
    }
    return (
        <>
            <ObjectForm
                inputFields={inputFields}
                setInputFields={setInputFields}
                data={data}
            />
        </>
    )
}

CityAdd.layout = AdminLayout