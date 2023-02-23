import ClientLayout from "../../components/client";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Spinner1} from "../../components/layout/spinner";
import {MasterService} from "../../lib/http";
import {BaseModal} from "../../components/layout/form/modal";
import {InputDate, InputText, InputTextArea, InputTime} from "../../components/layout/form/fields";
import {Select} from "../../components/layout/form/select";
import {SwalDeletePopUp} from "../../components/layout/form/pop-up";

export default function Event() {
    const router = useRouter()
    const [inputFields, setInputFields] = useState({
        title: "",
        date_time: "",
        start_time: "",
        end_time: "",
        place: "",
        link_location: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const [click, setClick] = useState(false)
    const [stateProvince, setStateProvince] = useState([{id: "", state_province_name: ""}])
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
        }

        fetch().then(() => setIsLoading(false))
    }, [router])
    const data = {
        url: `${process.env.ENDPOINT_MASTER}`, // TODO
        redirects: `/client/profile`,
        module_name: `Profile`,
        title: `Save`,
        content_type: `application/json`,
        method: "POST"
    }
    let selectItem = {
        "state_province": stateProvince
    }
    if (isLoading) return <Spinner1/>
    return (
        <>
            {click ? <FormModalEvent
                    inputFields={inputFields}
                    setInputFields={setInputFields}
                    select={selectItem}
                    data={data} title={"Event"}
                    setClick={setClick}>

                </FormModalEvent>
                :
                <></>
            }
            <button type="button" onClick={() => setClick(true)}
                    className="mb-4 inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                Add Event
            </button>
            <div className="lg:flex shadow rounded-l-lg border border-gray-400">
                <div className="bg-blue-600 rounded-lg lg:w-2/12 py-6 block h-full shadow-inner">
                    <div className="text-center tracking-wide">
                        <div className="text-white font-bold text-4xl ">24</div>
                        <div className="text-white font-normal text-2xl">Sept</div>
                    </div>
                </div>
                <div className="w-full  lg:w-11/12 xl:w-full px-1 bg-white py-5 lg:px-2 lg:py-2 tracking-wide">
                    <div className="flex flex-row lg:justify-start justify-center">
                        <div className="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
                            <i className="far fa-clock"></i> 1:30 PM
                        </div>
                        <div className="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
                            Organiser : IHC
                        </div>
                    </div>
                    <div className="font-semibold text-gray-800 text-xl text-center lg:text-left px-2">
                        International Conference Dubai
                    </div>
                    <div className="text-gray-600 font-medium text-sm pt-1 text-center lg:text-left px-2">
                        A-142/1, A-142, Ganesh Nagar, Tilak Nagar, New Delhi, 110018
                    </div>
                    <div className={"text-center lg:text-left lg:pt-0 pt-3"}>
                    <span className="tracking-wider text-gray-600 bg-gray-200 px-2 text-sm rounded
                    leading-loose mx-1 font-semibold">
                        Going
                    </span>
                    </div>
                </div>
                <div className="flex lg:flex-col flex-row lg:items-end items-center w-full lg:w-1/3 bg-white
                    lg:justify-end justify-center px-2 lg:py-2 pb-4 lg:px-0">
                    <button className="tracking-wider text-white text-opacity-80 bg-blue-500
                    px-2 text-md rounded leading-loose mx-1 lg:mr-3 my-2 font-semibold"
                            onClick={() => setClick(true)}>
                        <i className="fa-solid fa-pen fa-fw"></i>
                    </button>
                    <button className="tracking-wider text-white text-opacity-80 bg-red-600
                    px-2 text-md rounded leading-loose mx-1 lg:mr-3 my-2.5 font-semibold"
                            onClick={() => SwalDeletePopUp({url: "", router: router})}>
                        <i className="fa-regular fa-trash-can fa-fw"></i>
                    </button>
                </div>
            </div>
        </>
    )
}


Event.layout = ClientLayout


function FormModalEvent(props) {
    console.log(props.inputFields)
    const [city, setCity] = useState([{id: "", city_name: ""}])
    const handleChangeText = (key, event) => {
        props.setInputFields({...props.inputFields, [key]: event.target.value})
    }
    useEffect(() => {
        async function fetch() {
            let size = 10
            let sort = "sort"
            const request = {
                url: `cities?size=${size}`,
            }
            const res = await MasterService(request).then(res => {
                return res
            }).catch(err => {
                return err
            })
            request.url = `cities?filters=["state_province_id","${props.inputFields.state_province_id}"]&size=${res.data.total}&sort=city_code,city_name,${sort}&fields=id,city_name`
            const response1 = await MasterService(request).then(res => {
                return res
            }).catch(err => {
                return err
            })
            if (response1.data.items.length !== 0) {
                setCity([])
            } else {
                setCity([{id: "", city_name: ""}])
            }
            response1.data.items.map((item) => {
                setCity((prevState) => [
                    ...prevState, {
                        "id": item.id,
                        "city_name": item.city_name
                    },
                ]);
            })
        }

        fetch().then()
    }, [props.inputFields.state_province_id])
    return (
        <BaseModal title={props.title} setClick={props.setClick}>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full md:w-1/2 px-3 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Title
                    </label>
                    <InputText key={"title"} keyInput={"title"} placeholder={"Resepsi"}
                               inputFields={props.inputFields.title}
                               handleChangeText={handleChangeText}/>
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Date
                    </label>
                    <InputDate key={"date_time"} keyInput={"date_time"}
                               inputFields={props.inputFields.date_time}
                               handleChangeText={handleChangeText}/>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 py-2">
                <div className="w-full md:w-1/2 px-3 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Start
                    </label>
                    <InputTime key={"start_time"} keyInput={"start_time"}
                               inputFields={props.inputFields.start_time}
                               handleChangeText={handleChangeText}/>
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        End
                    </label>
                    <InputTime key={"end_time"} keyInput={"end_time"}
                               inputFields={props.inputFields.end_time}
                               handleChangeText={handleChangeText}/>
                </div>
            </div>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Address
            </label>
            <InputTextArea key={"address"} keyInput={"address"}
                           inputFields={props.inputFields.address}
                           handleChangeText={handleChangeText}/>
            <div className="flex flex-wrap -mx-3 py-2">
                <div className="w-full md:w-1/2 px-3 md:mb-0">
                    {props.select.state_province !== undefined ?
                        <Select data={props.select.state_province} setInputFields={props.setInputFields}
                                inputFields={props.inputFields}
                                title={"state_province"}/>
                        :
                        <></>
                    }
                </div>
                <div className="w-full md:w-1/2 px-3">
                    {props.inputFields.state_province_id !== undefined && props.inputFields.state_province_id !== null && city[0].id !== "" ?
                        <Select data={city} setInputFields={props.setInputFields}
                                inputFields={props.inputFields}
                                title={"city"}/>
                        :
                        <></>
                    }
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 py-2">
                <div className="w-full px-3 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Place
                    </label>
                    <InputText key={"place"} keyInput={"place"}
                               placeholder={"Grand Galaxy Convention Center Hall Bekasi"}
                               inputFields={props.inputFields.place}
                               handleChangeText={handleChangeText}/>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 py-2">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Link Location
                    </label>
                    <InputText key={"link_location"} keyInput={"link_location"}
                               placeholder={"https://goo.gl/maps/Wf4amX7MHzC9LQn4A"}
                               inputFields={props.inputFields.link_location}
                               handleChangeText={handleChangeText}/>
                </div>
            </div>
        </BaseModal>
    )
}