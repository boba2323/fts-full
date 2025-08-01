import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { format } from 'date-fns';
import moment from 'moment';
import { FaUsers, FaKey, FaClipboardList, FaPlus  } from 'react-icons/fa';

const DashboardMain = () => {
  const [fileData, setData] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchData = async ()=>{
      setLoading(true)
      try {
        const response = await axios.get("http://127.0.0.1:8000/drf/files/",
            {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true, // Optional: only needed if cookies are set
        
        }
          )
          setData(response.data)
        } catch (error) {
          console.error("Error fetching file data:", error)
          setData([])
        } finally {
          setLoading(false)
        }
      }
    fetchData()
  }, [])

  return (
    <div >
      <div>
        <div className="min-h-96 bg-purple-700 ">
          <header className='px-6 pt-16'>
            <h2 className='text-4xl font-extrabold mb-2 text-gray-100'>Welcome to FTS</h2>
            <p className='mt-5 text-xl font-medium text-gray-300 w-2/5'>The enterprise file management and privacy compliant system</p>
          </header>
          <div className='flex flex-col px-6'>
            <header className='flex flex-row justify-between items-center my-10'>
              <h3 className='text-3xl font-thin text-purple-50 p-1'>Your workflow is 
                <span className='text-2xl text-orange-300 font-bold'> simple</span> and 
                <span className='text-2xl text-orange-300 font-bold'> inutitive</span></h3>
              <img src="/genericfts.jpg" alt="placeholder fts image" className='w-[400px] h-auto border-8
              border-purple-100 rounded-xl  shadow-md' />
            </header>
          </div>
        </div>
        <div className='flex flex-col px-6 pb-44 mb-20'>
          <section className='flex flex-row justify-around text-lg font-medium text-gray-800 my-16'>
            <div className="w-56 h-48 border border-gray-100 shadow-lg shadow-purple-50 rounded-xl
              flex flex-col  p-4">
              <div className="py-1">< FaUsers size='30' className='text-purple-600'/></div>
              <p className='pt-1'>Create a team</p>
              <p className='pt-1 text-sm font-thin text-gray-600'>Be a team leader and add other users to your team
                so they can be a part of your work
              </p>
            </div>
            <div className="w-56 h-48 border border-gray-100 shadow-lg shadow-purple-50 rounded-lg
            flex flex-col p-4">
              <div className="py-1"><FaKey size='30' className='text-purple-600'/></div>
              <p className='pt-1'>Make an access key</p>
              <p className='pt-1 text-sm font-thin text-gray-600'>This provides ability to upload files and work on them
                while also siloing your data from other teams
              </p>
            </div>
            <div className="w-56 h-48 border border-gray-100 shadow-lg shadow-purple-50 rounded-lg
            flex flex-col p-4">
              <div className="py-1"><FaClipboardList size='30' className='text-purple-600'/></div>
              <p className='pt-1'>Start working</p>
              <p className='pt-1 text-sm font-thin text-gray-600'>Now you are all set and ready to work!
              </p>
            </div>
          </section>
        </div>
        <h3>hello, FTS helps you organise teams and control what parts of your databse they can access</h3>
        
        lets get you started.
        you can create a team, invite existing users to join provided they are not part of any other Team
        once you made the team, you can make an access code and assign it to your team
        then you can upload files and sign it with your code!
        now you control them completely. as leader, dont forget you can invite workers to your team who can work with you 
        on the files you own!
      </div>
    </div>
  )
}

export default DashboardMain
