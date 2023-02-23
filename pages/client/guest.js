import ClientLayout from "../../components/client";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {BaseModal} from "../../components/layout/form/modal";
import {InputEmail, InputText} from "../../components/layout/form/fields";
import {Spinner1} from "../../components/layout/spinner";
import {TabsNavigation} from "../../components/layout/form/tabs";
import {Table} from "../../components/layout/form/table";
import Swal from "sweetalert2";
import {SwalDeletePopUp} from "../../components/layout/form/pop-up";

export default function Guest() {
    const router = useRouter()
    const [activeStatus, setActiveStatus] = useState(0);
    const [inputFields, setInputFields] = useState({
        name: "",
        description: "",
        phone_number: "",
        email: "",
    })
    const [isLoading, setIsLoading] = useState(false)
    const [click, setClick] = useState(false)
    const [data, setData] = useState([
        {
            "id": 1,
            "name": "Firman Agam",
            "description": "",
            "phone_number": "081214025919",
            "email": "agam.pro234@gmail.com",
        },
        {
            "id": 2,
            "name": "Firda Dwi Gameswanti",
            "description": "",
            "phone_number": "089625453562",
            "email": "firdagms@gmail.com",
        },
    ])
    const [dataCongratulation, setDataCongratulation] = useState([
        {
            "id": 1,
            "name": "Firman Agam",
            "invitation_arrival": "",
            "persons": "081214025919",
            "congratulation": "agam.pro234@gmail.com",
        },
        {
            "id": 1,
            "name": "Firman Agam",
            "invitation_arrival": "",
            "persons": "081214025919",
            "congratulation": "agam.pro234@gmail.com",
        },
    ])
    useEffect(() => {
        setIsLoading(true)

        async function fetch() {
            let size = 10
            let sort = "sort"
        }

        fetch().then(() => setIsLoading(false))
    }, [router])
    const tabs = [
        {
            path: "guest",
            name: "Guests",
            icon: "fas fa-users fa-fw fa-1x",
        },
        {
            path: "congratulations",
            name: "Congratulations",
            icon: "fas fa-comment fa-fw fa-1x",
        }
    ]
    useEffect(() => {
        console.log("USE EFFECT ACTIVE STATUS")
        setData([
            {
                "id": 1,
                "name": "Firman Agam",
                "description": "",
                "phone_number": "081214025919",
                "email": "agam.pro234@gmail.com",
            },
            {
                "id": 2,
                "name": "Firda Dwi Gameswanti",
                "description": "",
                "phone_number": "089625453562",
                "email": "firdagms@gmail.com",
            },
        ])
        setDataCongratulation([
            {
                "id": 1,
                "name": "Firman Agam & Firda Dwi Gameswanti",
                "invitation_arrival": "Hadir",
                "persons": "6",
                "congratulation": "Jazakallahu khairan katsiran",
            },
            {
                "id": 2,
                "name": "Deasy Sukma Pertiwi & Suami",
                "invitation_arrival": "Insya Allah",
                "persons": "5",
                "congratulation": "Barakallahu fiikum",
            },
        ])
    }, [activeStatus])
    if (isLoading) return <Spinner1/>
    return (
        <>
            {click ? <FormModalGuest
                    inputFields={inputFields}
                    setInputFields={setInputFields}
                    title={"Guest"}
                    setClick={setClick}>
                </FormModalGuest>
                :
                <></>
            }
            <TabsNavigation tabs={tabs} router={router} active={activeStatus} setActive={setActiveStatus}>
            </TabsNavigation>
            {activeStatus === 0 ?
                <>
                    <Table data={data} customAddButton={
                        <div>
                            <button onClick={() => setClick(true)}
                                    className="inline-block items-center px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-lg hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                                Add Guest
                            </button>
                        </div>
                    } action={
                        <>
                            <button
                                className={"font-medium text-gray-600 dark:text-gray-600 hover:underline"}
                                onClick={() => {
                                    navigator.clipboard.writeText("DICOPY COY")
                                    Swal.fire({title: "Clipboard", text: "Link Is Success to Clipboard", timer: 2000})
                                }}>
                                <i className="fa-regular fa-clipboard fa-fw fa-1x"/>
                            </button>
                            <button
                                className={"font-medium text-green-600 dark:text-green-500 hover:underline"}
                                onClick={() => {
                                }}>
                                <i className="fa-brands fa-whatsapp fa-fw fa-1x"/>
                            </button>
                        </>
                    }/>
                </>
                :
                <></>
            }
            {activeStatus === 1 ?
                <Table data={dataCongratulation} actionDefault={""} action={
                    <>
                        <button
                            className={"font-medium text-red-600 dark:text-red-500 hover:underline"}
                            onClick={() => {
                                SwalDeletePopUp({url: "", router: router})
                            }}>
                            <i className="fa-regular fa-trash-can fa-fw fa-1x"/>
                        </button>
                    </>
                }/>
                :
                <></>
            }
        </>
    )
}


Guest.layout = ClientLayout


function FormModalGuest(props) {
    const handleChangeText = (key, event) => {
        props.setInputFields({...props.inputFields, [key]: event.target.value})
    }
    const data = {
        url: `${process.env.ENDPOINT_MASTER}`, // TODO
        redirects: `/client/profile`,
        module_name: `Profile`,
        title: `Save`,
        content_type: `application/json`,
        method: "POST"
    }
    useEffect(() => {
        async function fetch() {
        }

        fetch().then()
    }, [props.inputFields.state_province_id])
    return (
        <BaseModal title={props.title} setClick={props.setClick}>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Guest Name
                    </label>
                    <InputText key={"name"} keyInput={"name"} placeholder={"Joko Dodo"}
                               inputFields={props.inputFields.name}
                               handleChangeText={handleChangeText}/>
                </div>
                <div className="w-full px-3 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-2">
                        More Description
                    </label>
                    <InputText key={"description"} keyInput={"description"} placeholder={"Yth....."}
                               inputFields={props.inputFields.description}
                               handleChangeText={handleChangeText}/>
                </div>
                <div className="w-full px-3 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-2">
                        Whatsapp Number
                    </label>
                    <InputText key={"phone_number"} keyInput={"phone_number"} placeholder={"081xxxxxxxxx"}
                               inputFields={props.inputFields.phone_number}
                               handleChangeText={handleChangeText}/>
                </div>
                <div className="w-full px-3 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-2">
                        Email
                    </label>
                    <InputEmail key={"email"} keyInput={"email"} placeholder={"email@example.com"}
                                inputFields={props.inputFields.email}
                                handleChangeText={handleChangeText}/>
                </div>
            </div>
        </BaseModal>
    )
}