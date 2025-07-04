import React from 'react'
import { useAuth } from "../../authentication/authProvider"
import { Link } from 'react-router-dom'

const Header = () => {
    const {userIn} =useAuth()
  return (
    <div className='w-full flex flex-row bg-green-800 justify-between'>
        <Link to={``} >
            <div className="flag ps-6 pb-2">
                <div className="top text-2xl font-semibold tracking-widest text-gray-50">FTS</div>
                <div className="bottom text-sm text-gray-50">A file system</div>
            </div>
        </Link>
        
        <div className="profile flex justify-center items-center pe-6 ">
            {userIn?
                <>
                    <div className="userInfo pe-3">
                        <p className='text-xs text-gray-50 font-normal'>{userIn.email}</p>
                        {userIn.belongs_to_team
                        ?<p className='text-xs text-gray-100 font-thin'>Team: {userIn.belongs_to_team}</p>
                        :<p className='text-xs text-gray-100 font-thin'>Team: None</p>}
                        
                    </div>
                    <div className="userbox border-1  bg-green-700 p-2 rounded">
                        <p className='text-xs text-gray-50'>{userIn.username}</p>
                    </div>
                
                </> :<div className="userbox border-1  bg-green-700 p-2 rounded">
                        <p className='text-xs text-gray-50'>Not logged in</p>
                    </div>
            }
            
        </div>
    </div>
  )
}

export default Header
