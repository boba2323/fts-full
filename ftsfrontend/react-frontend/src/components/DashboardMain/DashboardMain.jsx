import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { format } from 'date-fns';
import moment from 'moment';
import { FaUsers, FaKey, FaClipboardList, FaPlus  } from 'react-icons/fa';
import { FaForward } from "react-icons/fa6";
import { FaPaperclip } from "react-icons/fa6";
import { Link } from 'react-router-dom';



const DashboardMain = () => {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const [fileData, setData] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchData = async ()=>{
      setLoading(true)
      try {
        const response = await axios.get(`${API_BASE_URL}/files/`,
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
      <div className='pb-20 mb-20'>
        <div className="min-h-96 bg-purple-700 ">
          <header className='px-6 pt-16'>
            <h2 className='text-4xl font-extrabold mb-2 text-gray-100'>Welcome to Crumpet</h2>
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
        <div className='flex flex-col px-8 pb-20'>
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
          <section className='mt-8'>
            <div className="entry flex flex-row items-center">
              <Link to='/fts/workspace'>
              <button className='group  p-5 flex flex-row items-center bg-orange-300 rounded-lg text-gray-800 hover:bg-orange-500
              transition-all duration-500'>
                Lets get started 
                <span className='ps-3 transform transition-transform duration-300 group-hover:translate-x-2'><FaForward /></span>
              </button>
              </Link>
              <p className='p-6 px-12 text-gray-700 text-base'>Proceed to your workspace</p>
            </div>
          </section>
        </div>
        
        <div className="features bg-white py-20 px-8">
          <header className=' py-2 flex flex-row 
            text-3xl text-gray-700 font-extrabold '>
            <span className='border-b-4 border-orange-300 py-3'>Main features</span>
          </header>
          <section className=' bg-white py-4 px-6 text-gray-800'>
            <aside className='py-4 my-5 flex flex-row'>
              <div className="left w-1/2">
                <h1 className='text-2xl  font-bold py-6'>Team Creation</h1>
                <ul className='space-y-1 text-base text-gray-700 font-thin list-none'>
                  <li className='flex flex-row items-start gap-2'>
                    <span><FaPaperclip className='text-purple-500 mt-1' size='16'/></span>
                    <p>Users can create teams and add others and provide access to the files they upload</p>
                  </li>
                  <li className='flex flex-row items-start gap-2'>
                    <span><FaPaperclip className='text-purple-500 mt-1' size='16'/></span>
                    <p>You can create only one team at a time for now to keep the flow simple</p>
                  </li>
                  <li className='flex flex-row items-start gap-2'>
                    <span><FaPaperclip className='text-purple-500 mt-1' size='16'/></span>
                    <p>Removing a user from a team takes away their ability to view your files</p>
                  </li>
                  <li className='flex flex-row items-start gap-2'>
                    <span><FaPaperclip className='text-purple-500 mt-1' size='16'/></span>
                    <p>Team leaders exercise full control over their teams</p>
                  </li>
                </ul>
              </div>
              <div className="right w-1/2 ps-10">
                <img src="/crumpetlanding2.jpg" alt="placeholder fts image" className='w-[450px] h-auto border-8
                border-orange-100 rounded-xl  shadow-md' />
              </div>
              
            </aside >
            <aside className='py-4 my-5 flex flex-row items-center justify-between'>
              <div className="left w-1/2">
              <img src="/genericfts.jpg" alt="placeholder fts image" className='w-[300px] h-auto border-8
              border-purple-100 rounded-xl  shadow-md' /></div>
              <div className="right w-1/2">
                <h1 className='text-2xl  font-bold py-6'>Logging, Audit trails</h1>
                <ul className='space-y-1 text-base text-gray-700 font-thin'>
                  <li className='flex flex-row items-start gap-2'>
                    <span><FaPaperclip className='text-purple-500 mt-1' size='16'/></span>
                    <p>Actions of a team are recorded in the database</p>
                  </li>
                  <li className='flex flex-row items-start gap-2 '>
                    <span><FaPaperclip className='text-purple-500 mt-1' size='16'/></span>
                    <p>The logs are available for all members of the team to see</p>
                  </li>
                  <li className='flex flex-row items-start gap-2'>
                    <span><FaPaperclip className='text-purple-500 mt-1' size='16'/></span>
                    <p>More comprehensive logging planned. Detailed logs will point to every actions of the team members in a easy to read and intuitive way</p>
                  </li>
                </ul>
              </div>
            </aside >
            <aside className='py-4 my-5 flex flex-row'>
              <div className="left w-1/2">
                <h1 className='text-2xl  font-bold py-6'>Time  Based Access Keys</h1>
                <ul className='space-y-1 text-base text-gray-700 font-thin'>
                  <li className='flex flex-row items-start gap-2'>
                    <FaPaperclip className='text-purple-500 mt-1'/>
                    <p> Access keys permit teams to upload (and work) on files. Without them, it is not possible</p>
                  </li>
                  <li className='flex flex-row items-start gap-2'>
                    <FaPaperclip className='text-purple-500 mt-1'/>
                    <p>They provide enhanced control over how a team uses its ability to upload (and work) on files</p>
                  </li>
                  <li className='flex flex-row items-start gap-2'>
                    <FaPaperclip className='text-purple-500 mt-1'/>
                    <p>Access keys can be made to expire after a time by kicking off tasks in a celery beat scheduler </p>
                  </li>
                  <li className='flex flex-row items-start gap-2'>
                    <FaPaperclip className='text-purple-500 mt-1'/>
                    <p>It also provides more ways to perform logging actions</p>
                  </li>
                </ul>
              </div>
              <div className="right w-1/2"></div>
              
            </aside >
          </section>
        </div>
      </div>
    </div>
  )
}

export default DashboardMain
