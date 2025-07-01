// https://react-icons.github.io/react-icons/icons/fa6/
import React, { useState } from 'react'
import { FaArrowUpFromBracket } from "react-icons/fa6";
import { FaUserGroup } from "react-icons/fa6";

import { Link } from 'react-router-dom';
import { useAuth } from '../../authentication/authProvider';
// https://github.com/react-icons/react-icons#configuration
// this for styling icons
import { IconContext } from "react-icons";


const Header3 = ({
}) => {
  // get the user from the context authProvider
  const {userIn} = useAuth()

  // const onClickHandler = ()=>{
  //   onClick()
  // }

  return (
    <div className='w-full h-9 flex flex-row bg-green-50 justify-between border-b-2 border-green-100 px-4
     *:border-opacity-25'>
      <div className='flex flex-row'>left</div>
      <div className="right flex flex-row justify-end gap-3">
        <Link to={`upload-file`} >
        <button 
          className="fileupload flex my-2 px-2 hover:bg-yellow-50 transition duration-1000 hover:border rounded-sm text-xs justify-center bg-white border-green-100 text-center items-center"
          > 
          <div className='pe-2'><FaArrowUpFromBracket /></div>
          File Upload
        </button>
        </Link>
        {userIn.is_supervisor || userIn.is_superuser || userIn.is_Team_L1 || userIn.is_staff
        ?<Link to={`admin/create-team`} >
          <button 
          className="fileupload flex my-2 px-2 hover:bg-yellow-50 transition duration-1000 hover:border rounded-sm text-xs justify-center bg-white border-green-100 text-center items-center"
          > <IconContext.Provider value={{ color: "green", className: "global-class-name" }}>
            {/* https://github.com/react-icons/react-icons#configuration */}
              <div className='pe-2'><FaUserGroup  /></div>
            </IconContext.Provider>
          Team Create
        </button>
        </Link>
        :<></>}
        {userIn.is_supervisor || userIn.is_superuser || userIn.is_Team_L1 || userIn.is_staff
        ?<Link to={`admin/create-accesscode`} >
          <button 
          className="fileupload flex my-2 px-2 hover:bg-yellow-50 transition duration-1000 hover:border rounded-sm text-xs justify-center bg-white border-green-100 text-center items-center"
          > <IconContext.Provider value={{ color: "green", className: "global-class-name" }}>
            {/* https://github.com/react-icons/react-icons#configuration */}
              <div className='pe-2'><FaUserGroup  /></div>
            </IconContext.Provider>
          Access Code Create
        </button>
        </Link>
        :<></>}

        
      </div>
      
      
      {/* {isUpload
      ?<></>
      :<button 
        className="fileupload flex my-2 px-2 hover:bg-yellow-50 transition duration-1000 hover:border rounded-sm text-xs justify-center bg-white border-green-100 text-center items-center"
        onClick={onClickHandler}> 
          <div className='pe-2'><FaArrowUpFromBracket /></div>
        File Upload
      </button>} */}
      
    </div>
  )
}

export default Header3
