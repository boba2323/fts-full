// https://react-icons.github.io/react-icons/icons/fa6/
import React, { useState } from 'react'
import { FaArrowUpFromBracket } from "react-icons/fa6";



const Header2 = () => {
  const [isUpload, setIsUpload] = useState(true);

  const FileUpload=()=>{
    setIsUpload(!isUpload)
    alert("i was lciked")
  }

  return (
    <div className='w-full h-9 flex flex-row bg-green-50 justify-between border-b-2 border-green-100 px-4
     *:border-opacity-25'>
      <div>left</div>
      <button 
      className="fileupload flex my-2 px-2 hover:bg-yellow-50 transition duration-1000 hover:border rounded-sm text-xs justify-center bg-white border-green-100 text-center items-center"
      onClick={FileUpload}> 
        <div className='pe-2'><FaArrowUpFromBracket /></div>
        File Upload
        </button>
    </div>
  )
}

export default Header2
