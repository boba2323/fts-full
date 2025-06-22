// https://react-icons.github.io/react-icons/icons/fa6/
import React, { useState } from 'react'
import { FaArrowUpFromBracket } from "react-icons/fa6";
import { Link } from 'react-router-dom';



const Header2 = ({
  onClick
  
}) => {

  const onClickHandler = ()=>{
    onClick()
  }

  return (
    <div className='w-full h-9 flex flex-row bg-green-50 justify-between border-b-2 border-green-100 px-4
     *:border-opacity-25'>
      <div>left</div>
      <Link to={`upload-file`} >
        <button 
        className="fileupload flex my-2 px-2 hover:bg-yellow-50 transition duration-1000 hover:border rounded-sm text-xs justify-center bg-white border-green-100 text-center items-center"
        onClick={onClickHandler}> 
          <div className='pe-2'><FaArrowUpFromBracket /></div>
        File Upload
      </button>
      </Link>
      
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

export default Header2
