import React, { useState } from 'react'
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { useAuth } from '../../authentication/authProvider';

const PaginationSticker = ({responseData, onClick, pageQueryParam} ) => {
  const {userIn, hitMeandFetch} = useAuth()
  const pageSize = 10; // <- match your DRF PAGE_SIZE
  console.log("responseData in pagination sticker", responseData, responseData.count)
  const totalPages = Math.ceil(responseData.count / pageSize);

  let noPagReq, startPag, endPag, middlePag
  if (responseData.previous ===null && responseData.next===null){
    noPagReq=true
  } else if (responseData.previous ===null && responseData.next!=null){
    startPag=true
  } else if (responseData.previous !=null && responseData.next===null){
    endPag=true
  } else {
    middlePag=true
  }
  console.log("pagination response data", responseData)
  return (
    <div>
      <div className='text-xs flex flex-row justify-center text-orange-700 p-2'>
        {noPagReq || Object.keys(responseData).length === 0?<></>
        :<p className='flex flex-row justify-center items-center space-x-2'>
          {startPag?<></>
          :<span className='cursor-pointer hover:text-orange-300'>
              <FaAngleLeft />
          </span> }
          <span className='cursor-pointer hover:text-orange-300'
              onClick={onClick}
          >{startPag?  1
          :endPag? totalPages 
          :pageQueryParam
          } of {totalPages}</span> 
          {endPag?<></>
          :<span className='cursor-pointer hover:text-orange-300'><FaAngleRight /></span>}
        </p>}
      </div>
    </div>
  )
}

export default PaginationSticker