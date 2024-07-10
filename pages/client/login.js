import Login from "../../components/layout/login";

export default function ClientLogin() {
    console.log(process.env)
    return <Login redirect={"/client"}/>
}