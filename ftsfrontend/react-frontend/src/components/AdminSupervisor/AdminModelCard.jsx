import React from 'react'

const AdminModelCard = ({
    teamname,
    membercount,
}) => {
  return (
    <div className="admincard bg-gradient-to-b from-gray-100 to-gray-50 flex flex-col w-40 h-52 rounded-2xl 
        shadow-sm
        hover:scale-105 hover:shadow-xl
        transition-all duration-500 group
        cursor-pointer
        ">

      {/* Team Name */}
      <h1 className="teamname flex justify-center items-center 
          text-xl font-bold text-gray-700 mt-3 py-2
          transition-all duration-500 ease-out
          group-hover:translate-y-[-2px] group-hover:scale-105 group-hover:text-green-600
          delay-100">
          {teamname}
      </h1>

      {/* Content Count */}
      <h1 className="contentnumber flex justify-start ps-7
          text-sm font-light text-gray-600
          transition-all duration-500 ease-out
          group-hover:translate-y-[-1px] group-hover:scale-105 group-hover:text-emerald-700
          delay-300">
          {membercount}
      </h1>
    </div>
  )
}

export default AdminModelCard
        //  text-xl font-extrabold tracking-wide text-green-400 

        


// my card
{/* <div className='admincard bg-gradient-to-b from-gray-100 to-gray-50 flex flex-col w-40 h-52 rounded-2xl 
      shadow-sm
      hover:scale-110 hover:shadow-xl 
      duration-500
      transition-transform
      '>
        <h1 className="teamname flex flex-row justify-center items-center 
          overflow-clip
          font-sans
          text-xl font-bold tracking-wide text-gray-700 
          antialiased mt-3 py-2">
            {teamname}
        </h1>
        <h1 className="contentnumber flex flex-row justify-start text-left items-start ps-7
          filter 
          text-lg font-semibold text-gray-600
          antialiased py-2">
           Content Amount: {membercount}
        </h1>
    </div> */}
