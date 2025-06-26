import React from 'react'
import AdminModelCard from './AdminModelCard'
import { Link, Navigate, Outlet } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const AdminPanel = () => {
  let location = useLocation();
  const adminPanel = location.pathname === "/fts/admin"
  const adminTeamCreate = location.pathname === "/fts/admin/create-team"
  
  return (
    <>
    {/* {
      adminPanel?<div>
        Welcome Superviser. You have full control here
        you can create teams, modufy teams, delete teams
        CUD teams
        CUD files
        CUD user
        <div>Current URL is {location.pathname}</div>
        RU modifications
        RU actionlogs
        <div className="card-canvas flex flex-col">
          <div className="row-top flex flex-row justify-center items-center justify-content-between my-3">
            <nav className='flex flex-row space-x-8'>
              <Link to={`admin-team`}>
                <AdminModelCard teamname={"Teams" } membercount={"View all the teams that have been created. Make new teams and edit or delete the existing ones"}/>
              </Link>
              
              <AdminModelCard teamname={"Files" }  membercount={"5"}/>
              <AdminModelCard teamname={"Users" }  membercount={"5"}/>
            </nav>
          </div>

          <div className="row-bottom flex flex-row justify-center items-center justify-content-between mt-2 ">
            <nav className='flex flex-row space-x-10'>
              <AdminModelCard teamname={"Modification"}   membercount={"5"}/>
              <AdminModelCard teamname={"ActionLog" } membercount={"5"}/>
            </nav>
          </div>
        </div>
    </div>:adminTeamCreate?
      <Outlet/>
      :<></>
    } */}
    
    
    <div>
        Welcome Superviser. You have full control here
        you can create teams, modufy teams, delete teams
        CUD teams
        CUD files
        CUD user
        <div>Current URL is {location.pathname}</div>
        RU modifications
        RU actionlogs
        <div className="card-canvas flex flex-col">
          <div className="row-top flex flex-row justify-center items-center justify-content-between my-3">
            <nav className='flex flex-row space-x-8'>
              <Link to={`admin-team`}>
                <AdminModelCard teamname={"Teams" } membercount={"View all the teams that have been created. Make new teams and edit or delete the existing ones"}/>
              </Link>
              <AdminModelCard teamname={"Files" }  membercount={"5"}/>
              <Link to={`admin-user`}>
                <AdminModelCard teamname={"Users" }  membercount={"5"}/>
              </Link>
            </nav>
          </div>

          <div className="row-bottom flex flex-row justify-center items-center justify-content-between mt-2 ">
            <nav className='flex flex-row space-x-10'>
              <AdminModelCard teamname={"Modification"}   membercount={"5"}/>
              <AdminModelCard teamname={"ActionLog" } membercount={"5"}/>
            </nav>
          </div>
        </div>
    </div>
    {/* <Outlet/> */}
    </>
    
  )
}

export default AdminPanel
