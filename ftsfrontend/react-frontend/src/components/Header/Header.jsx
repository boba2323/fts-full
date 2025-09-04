import React from 'react'
import { useAuth } from "../../authentication/authProvider"
import { Link } from 'react-router-dom'

const Header = () => {
    const {userIn} =useAuth()
  return (
    <nav className='w-full flex flex-row bg-white '>
        <div className="flag-2 flex ps-4 flex-row justify-start items-center w-10/12">
            <Link to={``} >
            <div className="flag py-2 ">
                <div className="top text-xl font-extrabold tracking-widest text-gray-700">Crumpet</div>
                <div className="bottom text-xs font-medium text-gray-700">A file system</div>
            </div>
            </Link>

            <p className="top text-sm ps-4 ms-10 font-medium  text-gray-700">Effectively secure your teams and files</p>
        </div>

        <div className="rightsideheadr flex flex-row justify-end items-center w-2/12">
            <div className="profile flex flex-row justify-end items-center pe-6 py-1 ps-4 bg-brown-50 my-1 rounded-md me-4">
            {userIn?
                <>
                    <div className="userInfo pe-3">
                        <p className='text-xs text-gray-900 font-normal'>{userIn.email}</p>
                        {userIn.belongs_to_team
                        ?<p className='text-xs text-gray-900 font-thin'>Team: {userIn.belongs_to_team}</p>
                        :<p className='text-xs text-gray-900 font-thin'>Team: None</p>}
                        
                    </div>
                    <div className="userbox border-1 flex flex-row justify-center items-center text-center bg-white w-10 h-10 rounded-full">
                        <p className='text-xs text-gray-900 '>{userIn.username}</p>
                    </div>
                
                </> :<div className="userbox border-1  bg-white p-2 m-2  rounded-full">
                        <p className='text-xs text-gray-900'>Not logged in</p>
                    </div>
            }
            </div>
        </div>
    </nav>
  )
}

export default Header
