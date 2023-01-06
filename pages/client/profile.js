import ClientLayout from "../../components/client";
import {useEffect, useState} from "react";
import {FormModal, BaseModal} from "../../components/layout/form/modal";
import {CardProfileHalfWidth, CardUserProfile} from "../../components/layout/card";
import {useRouter} from "next/router";
import {Spinner1} from "../../components/layout/spinner";
import {MasterService} from "../../lib/http";
import {InputText, InputTextArea} from "../../components/layout/form/fields";
import {Select} from "../../components/layout/form/select";

export default function Profile() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [stateProvince, setStateProvince] = useState([{id: "", state_province_name: ""}])
    const [gender, setGender] = useState([{id: "", gender_name: ""}])
    const [click, setClick] = useState(false)
    const [click1, setClick1] = useState(false)
    const [inputMan, setInputMan] = useState(
        {first_name: "", last_name: "", parents_name: "", nickname: "", address: ""}
    )
    const [inputWoman, setInputWoman] = useState(
        {first_name: "", last_name: "", parents_name: "", nickname: "", address: ""}
    )
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
            request.url = `genders?size=${size}`
            const res2 = await MasterService(request).then(res => {
                return res
            }).catch(err => {
                return err
            })
            request.url = `genders?size=${res2.data.total}&sort=gender_code,gender_name,${sort}&fields=id,gender_name`
            const response2 = await MasterService(request).then(res => {
                return res
            }).catch(err => {
                return err
            })
            if (response2.data.items.length !== 0) {
                setGender([])
            }
            response2.data.items.map((item) => {
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
        url: `${process.env.ENDPOINT_MASTER}`, // TODO
        redirects: `/client/profile`,
        module_name: `Profile`,
        title: `Save`,
        content_type: `application/json`,
        method: "POST"
    }
    let selectItem = {
        "gender": gender,
        "state_province": stateProvince
    }
    if (isLoading) return <Spinner1/>
    return (
        <>
            {click ? <FormModalProfile
                    inputFields={inputMan}
                    setInputFields={setInputMan}
                    select={selectItem}
                    data={data} title={"Groom"}
                    setClick={setClick}>

                </FormModalProfile>
                :
                <></>
            }
            {click1 ? <FormModalProfile
                    inputFields={inputWoman}
                    setInputFields={setInputWoman}
                    select={selectItem}
                    data={data} title={"Bride"}
                    setClick={setClick1}>

                </FormModalProfile>
                :
                <></>
            }
            {/*<div className={"flex justify-between space-x-3 -m-3"}>*/}
            {/*    <CardProfileHalfWidth title={"Groom"} setClick={setClick} click={click}/>*/}
            {/*    <CardProfileHalfWidth title={"Bride"} setClick={setClick1} click={click1}/>*/}
            {/*</div>*/}
            <div
                className={"bg-gray-200 dark:bg-gray-900 flex flex-wrap items-center justify-center max-w-full overflow-auto"}>
                <CardUserProfile title={"Groom"} setClick={setClick} click={click}/>
                <CardUserProfile title={"Bride"} setClick={setClick1} click={click1}/>
            </div>
        </>
    )
}


Profile.layout = ClientLayout

function FormModalProfile(props) {
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
            console.log(response1.data, response1.data.items.length)
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
                        First Name
                    </label>
                    <InputText key={"first_name"} keyInput={"first_name"}
                               inputFields={props.inputFields.first_name}
                               handleChangeText={handleChangeText}/>
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Last Name
                    </label>
                    <InputText key={"last_name"} keyInput={"last_name"}
                               inputFields={props.inputFields.last_name}
                               handleChangeText={handleChangeText}/>
                </div>
            </div>
            {props.select.gender !== undefined ?
                <Select data={props.select.gender} setInputFields={props.setInputFields}
                        inputFields={props.inputFields}
                        title={"gender"}/>
                :
                <></>
            }
            <div className="flex flex-wrap -mx-3 py-2">
                <div className="w-full md:w-1/2 px-3 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Nickname
                    </label>
                    <InputText key={"nickname"} keyInput={"nickname"}
                               inputFields={props.inputFields.nickname}
                               handleChangeText={handleChangeText}/>
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Parents Name
                    </label>
                    <InputText key={"parents_name"} keyInput={"parents_name"}
                               inputFields={props.inputFields.parents_name}
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
            <dd id="sosmed" className="h-full opacity-100 overflow-hidden transition-all ease-in-out duration-300 mt-2">
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                        <div><label htmlFor="twitter" className="flex justify-between"><span
                            className="block text-sm font-medium text-gray-700">Twitter</span> <span
                            className="text-sm text-gray-400">optional</span></label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <span className="inline-flex items-center px-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                    <i className="fa-brands fa-twitter"/>
                                </span>
                                <input id="twitter" type="text" name="twitter" placeholder="tulis tanpa @"
                                       autoComplete=""
                                       className="appearance-none block w-full p-3 border rounded-md rounded-l-none shadow-sm
                                placeholder-gray-400 focus:outline-none focus:ring-pinky-500 focus:border-pinky-500 text-sm  bg-white  border-gray-300 dark:border-gray-warm"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <div><label htmlFor="linkedin" className="flex justify-between"><span
                            className="block text-sm font-medium text-gray-700">LinkedIn</span> <span
                            className="text-sm text-gray-400">optional</span></label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <span className="inline-flex items-center px-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                    <i className="fa-brands fa-linkedin"/>
                                </span>
                                <input id="linkedin" type="text" name="linkedin" placeholder="tulis tanpa @"
                                       autoComplete=""
                                       className="appearance-none block w-full p-3 border rounded-md rounded-l-none shadow-sm
                                placeholder-gray-400 focus:outline-none focus:ring-pinky-500 focus:border-pinky-500 text-sm  bg-white  border-gray-300 dark:border-gray-warm"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <div><label htmlFor="instagram" className="flex justify-between"><span
                            className="block text-sm font-medium text-gray-700">instagram</span> <span
                            className="text-sm text-gray-400">optional</span></label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <span className="inline-flex items-center px-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                    <i className="fa-brands fa-instagram"/>
                                </span>
                                <input id="instagram" type="text" name="instagram" placeholder="tulis tanpa @"
                                       autoComplete=""
                                       className="appearance-none block w-full p-3 border rounded-md rounded-l-none shadow-sm
                                placeholder-gray-400 focus:outline-none focus:ring-pinky-500 focus:border-pinky-500 text-sm  bg-white  border-gray-300 dark:border-gray-warm"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <div><label htmlFor="facebook" className="flex justify-between"><span
                            className="block text-sm font-medium text-gray-700">Facebook</span> <span
                            className="text-sm text-gray-400">optional</span></label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <span className="inline-flex items-center px-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                    <i className="fa-brands fa-facebook"/>
                                </span>
                                <input id="facebook" type="text" name="facebook" placeholder="tulis tanpa @"
                                       autoComplete=""
                                       className="appearance-none block w-full p-3 border rounded-md rounded-l-none shadow-sm
                                placeholder-gray-400 focus:outline-none focus:ring-pinky-500 focus:border-pinky-500 text-sm  bg-white  border-gray-300 dark:border-gray-warm"/>
                            </div>
                        </div>
                    </div>
                </div>
            </dd>
        </BaseModal>
)
}