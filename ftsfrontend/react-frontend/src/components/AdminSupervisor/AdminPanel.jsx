import React from 'react'
import AdminModelCard from './AdminModelCard'
import { Link, Navigate, Outlet } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { FaArrowUpFromBracket } from "react-icons/fa6";
import { FaCashRegister } from "react-icons/fa6";
import { FaChessKnight } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";
import { FaFileContract } from "react-icons/fa6";
import { FaHammer } from "react-icons/fa6";
import { FaSnowman } from "react-icons/fa6";


const AdminPanel = () => {
  let location = useLocation();
  const adminPanel = location.pathname === "/fts/admin"
  const adminTeamCreate = location.pathname === "/fts/admin/create-team"
  
  return (
    <>
    <div className='px-6 pt-3 pb-32 mb-20'>
      <h1 className='text-lg text-gray-700 font-semibold mb-2'>Admin Dashboard</h1>
      <h1 className='text-sm text-gray-500 font-light mb-14'>
        Admins have access to perform all operations. They include supervisors as well as Team L2 members</h1>
        <div className="flex flex-row border-b-2 border-gray-300"></div>
        <div className="card-canvas flex flex-col mt-8 pt-10">
          <div className="row-top flex flex-row justify-center items-center justify-content-between my-3">
            <nav className='flex flex-row space-x-8'>
              <Link to={`admin-team`}>
                <AdminModelCard teamname={"Teams" } membercount={"View all the teams"} icon={<FaChessKnight size="30"/>}/>
              </Link>
              <Link to={`admin-files`}>
                <AdminModelCard teamname={"Files" }  membercount={"5"} icon={<FaFileContract size="30"/>}/>
              </Link>
              <Link to={`admin-user`}>
                <AdminModelCard teamname={"Users" }  membercount={"5"} icon={<FaSnowman size="30"/>}/>
              </Link>
            </nav>
          </div>

          <div className="row-bottom flex flex-row justify-center items-center justify-content-between mt-2 ">
            <nav className='flex flex-row space-x-10'>
              <Link to={'admin-modification'}>
                <AdminModelCard teamname={"Modification"}   membercount={"5"} icon={<FaCashRegister size="30"/>}/>
              </Link>
              <AdminModelCard teamname={"ActionLog" } membercount={"5"} icon={<FaArrowUpFromBracket size="30"/>}/>
              <Link to={`admin-accesscode`}>
                <AdminModelCard teamname={"Access Codes" } membercount={"5"} icon={<FaHammer size="30"/>}/>
              </Link>
            </nav>
          </div>
        </div>
    </div>
    {/* <Outlet/> */}
    </>
    
  )
}

export default AdminPanel
