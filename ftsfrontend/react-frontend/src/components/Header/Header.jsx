import React from 'react'
import { useAuth } from "../../authentication/authProvider"
import { Link } from 'react-router-dom'
import './header.css'

const Header = () => {
    const {userIn} =useAuth()
  return (
    <nav className='header w-full bg-white h-16 flex flex-row  fixed top-0 border-b border-gray-200'>
        <div className="flag-2 flex ps-6 flex-row justify-start items-center w-10/12">
            <Link to={``} >
            <div className="flag py-2 ">
                <div className="top text-xl font-extrabold tracking-widest text-gray-700">Crumpet</div>
                <div className="bottom text-xs font-medium text-gray-700">A file system</div>
            </div>
            </Link>

            <p className="top  ps-4 ms-10 font-semibold text-gray-500">Effectively secure your teams and files</p>
        </div>
            {userIn?
                <><div className="rightsideheadr flex flex-row justify-end items-center w-2/12">
                    <div className="profile flex flex-row justify-end items-center pe-6 py-1 ps-4 bg-brown-50 my-1 rounded-md me-4">
                        <div className="userInfo pe-3">
                            <p className='text-xs text-gray-900 font-normal'>{userIn.email}</p>
                            {userIn.belongs_to_team
                            ?<p className='text-xs text-gray-900 font-thin'>Team: {userIn.belongs_to_team}</p>
                            :<p className='text-xs text-gray-900 font-thin'>Team: None</p>}
                            
                        </div>
                        <div className="userbox border-1 flex flex-row justify-center items-center text-center bg-white w-10 h-10 rounded-full">
                            <p className='text-xs text-gray-900 '>{userIn.username}</p>
                        </div>
                    </div>
                </div>
                </> :<div className="flex justify-center items-center userbox border-2 border-orange-300 w-20 m-2 rounded-md">
                        <p className='text-base text-gray-200'>Login</p>
                    </div>
            }
    </nav>
  )
}

export default Header
