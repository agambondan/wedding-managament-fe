import AdminLayout from "../../../components/Layout/admin";
import {ObjectForm} from "../../../components/layout/form";
import {useState} from "react";
import Swal from "sweetalert2";

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
                InputFields={inputFields}
                SetInputFields={setInputFields}
                Data={data}
            />
        </>
    )
}

CityAdd.layout = AdminLayout