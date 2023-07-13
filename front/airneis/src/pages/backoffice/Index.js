import "../../assets/css/sb-admin-2.css"

import Header from "../../components/layouts/backoffice/Header";
import Topbar from "../../components/backoffice/Topbar";
import Sidebar from "../../components/backoffice/Sidebar";
import Tableau from "../../components/backoffice/Tableau";

function Index() {
    return (
        <>
            <Header />
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Topbar />
                        <div className="container-fluid">
                            <div className="row">
                                <Tableau />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Index;