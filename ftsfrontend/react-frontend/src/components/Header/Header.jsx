import React from 'react'
import { useAuth } from "../../authentication/authProvider"

const Header = () => {
    const {userIn} =useAuth()
  return (
    <div className='w-full flex flex-row bg-green-800 justify-between'>
        <div className="flag ps-6 pb-2">
            <div className="top text-2xl font-semibold tracking-widest text-gray-50">FTS</div>
            <div className="bottom text-sm text-gray-50">A file system</div>
        </div>
        <div className="profile flex justify-center items-center pe-6 ">
            {userIn?
                <>
                    <div className="userInfo pe-3">
                        <p className='text-xs text-gray-50 font-normal'>User Name something</p>
                        <p className='text-xs text-gray-100 font-thin'>something</p>
                    </div>
                    <div className="userbox border-1  bg-green-700 p-2 rounded">
                        <p className='text-xs text-gray-50'>User</p>
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
