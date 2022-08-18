import WithAuth from "../../lib/protected_route";
import Meta from "./meta";
import Sidebar from "./sidebar";
import Header, {HeaderMobile} from "./header";
import {Content} from "./content";

function AdminLayout(props) {
    return (
        <>
            <Meta/>
            <div className="flex">
                <div className="relative w-full flex flex-col h-screen overflow-y-hidden">
                    <div className="flex">
                        <Sidebar/>
                        <div className="relative w-full flex flex-col h-screen overflow-y-hidden">
                            <Header/>
                            <HeaderMobile/>
                            <Content>
                                {props.children}
                            </Content>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WithAuth(AdminLayout)