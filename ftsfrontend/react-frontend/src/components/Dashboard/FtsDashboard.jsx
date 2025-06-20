import React from "react"
import Header from "../Header/Header"
import Header2 from "../Header2/Header2"
import Sidebar from "../Sidebar/Sidebar"
import Rightbar from "../RightBar/Rightbar"
import DashboardMain from "../DashboardMain/DashboardMain"

const DashBoard = () =>{
    return (
        <>
            <Header />
            <Header2 />

            <div className="grid grid-cols-12 h-screen">
                <div className="col-span-1">
                    <Sidebar />
                </div>
                <div className="col-span-9 overflow-auto bg-white">
                    <DashboardMain/>
                </div>
                <div className="col-span-2">
                    <Rightbar/>
                </div>
            </div>
        </>
    )
}

export default DashBoard