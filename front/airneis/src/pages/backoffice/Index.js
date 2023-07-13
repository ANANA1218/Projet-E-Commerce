import $ from 'jquery'
import "../../assets/css/sb-admin-2.css"

import Chart from "../../components/backoffice/Chart";
import ColorSytem from "../../components/backoffice/ColorSystem";
import Heading from "../../components/backoffice/Heading";
import Illustration from "../../components/backoffice/Illustration";
import PieChart from "../../components/backoffice/PieChart";
import ProjectCard from "../../components/backoffice/ProjectCard";
import Sidebar from "../../components/backoffice/Sidebar";
import SmallCard from "../../components/backoffice/SmallCard";
import Topbar from "../../components/backoffice/Topbar";
import Header from "../../components/layouts/backoffice/Header";
import Tableau from "../../components/backoffice/Tableau";

function Index() {
    return (
        <>
            <Header />
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <div className="container-fluid">
                            <Topbar />
                            {/* 
                                <Heading />
                                <div className="row">
                                    <SmallCard />
                                </div>
                                <div className="row">
                                    <Chart />
                                    <PieChart />
                                </div>
                                <div className="row">
                                    <ProjectCard />
                                </div>
                                <div className="row">
                                    <div className="col-lg-6 mb-4">
                                        <ColorSytem color="primary" />
                                        <ColorSytem color="success" />
                                        <ColorSytem color="info" />
                                        <ColorSytem color="warning" />
                                        <ColorSytem color="secondary" />
                                        <ColorSytem color="light" />
                                        <ColorSytem color="dark" />
                                        <ColorSytem color="danger" />
                                    </div>
                                    <div className="col-lg-6 mb-4">
                                        <Illustration />
                                    </div>
                                </div> 
                            */}
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