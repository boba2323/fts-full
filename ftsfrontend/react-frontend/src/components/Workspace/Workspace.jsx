import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../authentication/authProvider'
import axios from 'axios'
import Loading from '../Loading/Loading'
import { FaUsers, FaKey, FaClipboardList, FaPlus   } from 'react-icons/fa';
import { FaBuildingCircleArrowRight } from "react-icons/fa6";
import { FaGg } from "react-icons/fa6";

const Workspace = () => {
  const [userAttribute, setUserAttribute] = useState({
    teamId:null,
    accessCode:null,
    modification:null,
    workers:null
  })
  const { userIn, setUserIn, loading, hitMeandFetch} = useAuth()
  useEffect( ()=>{ // get the team of the user if it exist, first step
    
    const getUserAllDataStatus = async()=>{
      // await hitMeandFetch()
      if (userIn?.team){
        const teamId = userIn.team.id 
        setUserAttribute(prev =>({
          ...prev,
          teamId:teamId
        }))
      } else {
        setUserAttribute(prev=>({
          ...prev,
          teamId:null
        }))
      }
    }
    getUserAllDataStatus()
  }, [userIn])
  console.log(userIn.team)

  return (
    <section className='px-6 pt-3 pb-10 mb-20'>
      <header>
        <h2 className='text-lg text-gray-700 font-semibold mb-2'>Workspace</h2>
        {/* <p className='text-lg font-semibold text-gray-700'>Start managing your work without hassle</p> */}
      </header>
      <aside className='mt-2'>
          <div className='flex flex-col'>
            <div className="flex flex-row items-center justify-between px-3 py-1 border-b border-gray-300">
              <div className="group flex flex-row items-center">
                <FaKey size='15' className='text-gray-500' />
                <p className='px-2 text-gray-600 text-base'>My Access Codes</p>
              </div>
              <Link to={`accesscode/create`} >
                <p className='text-gray-500 hover:bg-gray-100 p-1 text-sm rounded-sm'>New code</p>
              </Link>
            </div>
            {loading
            ?<Loading/>
            :userIn.access_code
            ?<div className='flex flex-row justify-start items-center px-5'>
                <FaGg size='15' className='text-purple-200'/>
                <Link to={`team/${userAttribute.teamId}`} 
                  className='text-orange-600 px-3 p-1 text-sm'>
                  {userIn.access_code}</Link>
              </div>
            :<div className='flex flex-row justify-center items-center'>
              <p className='text-gray-500  p-1 text-sm '>No codes</p>
            </div>}
            
          </div>
      </aside>

      <aside className='my-32'>
          <div className='flex flex-col'>
            <div className="flex flex-row items-center justify-between px-3 py-1 border-b border-gray-300">
              <div className="group flex flex-row items-center">
                <FaBuildingCircleArrowRight size='20' className='text-gray-500' />
                <p className='px-2 text-gray-600 text-base'>My Teams</p>
              </div>
              {/* <p><FaPlus className='text-gray-500' size='15'/></p> */}
              <Link to={`team/create`} >
                <p className='text-gray-500 hover:bg-gray-100 p-1 text-sm rounded-sm'>New team</p>
              </Link>
            </div>
            {loading 
            ?<Loading />
            :userAttribute.teamId
            ? <div className='flex flex-row justify-start items-center px-5'>
                <FaUsers size='15' className='text-purple-200'/>
                <Link to={`team/${userAttribute.teamId}`} 
                  className='text-orange-600 px-3 p-1 text-sm'>
                  {userIn?.team?.name}</Link>
              </div> 
            :<div className='flex flex-row justify-center items-center'>
              <p className='text-gray-500  p-1 text-sm '>No teams</p>
            </div>
            }
          </div>
      </aside>
    </section>

  )
}

export default Workspace
