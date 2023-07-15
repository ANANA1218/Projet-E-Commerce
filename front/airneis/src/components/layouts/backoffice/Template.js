import "../../../assets/css/sb-admin-2.css"

import Header from "../../../components/layouts/backoffice/Header";
import Topbar from "../../../components/backoffice/Topbar";
import Sidebar from "../../../components/backoffice/Sidebar";

function Template({ title, children }) {
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
                                <div className="text-center">
                                    <h2 className="m-5 text-center fw-bold text-dark">{title}</h2>
                                </div>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Template;