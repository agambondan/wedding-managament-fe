import AdminLayout from "../../../components/Layout/admin";
import Link from "next/link";

export default function CityIndex() {
    return (
        <>
            <h1 className={"px-2 pb-5"}>INI CITY</h1>
            <Link href={"/admin/city/add"}>
                <a className={"mt-5 px-10 py-3 text-blue-100 transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700"}>
                    Add
                </a>
            </Link>
        </>
    )
}

CityIndex.layout = AdminLayout