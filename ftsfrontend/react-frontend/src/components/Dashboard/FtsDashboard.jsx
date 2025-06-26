import React, { useState } from "react"
import Header from "../Header/Header"
import Header2 from "../Header2/Header2"
import Sidebar from "../Sidebar/Sidebar"
import Rightbar from "../RightBar/Rightbar"
import DashboardMain from "../DashboardMain/DashboardMain"
import FileUpload from "../FileUpload/FileUpload"
import { Outlet } from "react-router-dom"

const DashBoard = () =>{
    const [isUpload, setIsUpload] = useState(false);

    const changeDashComponent = ()=>{
        // alert("i was clicked")
        setIsUpload(!isUpload)
        console.log(isUpload)
    }
    
    return (
        <>
            <Header />
            <Header2 />

            <div className="grid grid-cols-12 h-screen">
                <div className="col-span-1">
                    <Sidebar  onClickHandler={changeDashComponent} />
                </div>
                <div className="col-span-9 overflow-auto bg-white">
                    {/* depending on which route we go, the child component will appear here */}
                    
                    <Outlet/>
                </div>
                <div className="col-span-2">
                    <Rightbar/>
                </div>
            </div>
        </>
    )
}

export default DashBoard