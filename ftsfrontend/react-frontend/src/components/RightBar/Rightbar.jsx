import React, { useEffect, useState } from 'react'
import axios from "axios";
import { data } from 'react-router-dom';

// https://dev.to/darkmavis1980/fetching-data-with-react-hooks-and-axios-114h
const Rightbar = () => {
  const [userData, setData] = useState()
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchData = async ()=>{
      setLoading(true)
      try {
        const response = await axios.get("http://127.0.0.1:8000/accounts/me/",
           {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true, // Optional: only needed if cookies are set
        
        }
          )
          setData(response.data)
        } catch (error) {
          console.error("Error fetching user data:", error)
          setData(error.message)
        } finally {
          setLoading(false)
        }
      }
    fetchData()
  }, [])
  
  

  return (
    <div className="flex flex-col h-screen bg-green-50 text-green-900 p-4">
      <h2 className="text-sm font-bold mb-6 ps-2">Team Alpha</h2>
      <nav className="space-y-3">
        {loading
        ? <p>loading</p>
        :<a href="#" className="block ps-2 hover:bg-green-50 rounded text-xs hover:border border-green-100">{userData['username']}</a>
        }
        
        <a href="#" className="block ps-2 hover:bg-green-50 rounded text-xs hover:border border-green-100">User M</a>
        <a href="#" className="block ps-2 hover:bg-green-50 rounded text-xs hover:border border-green-100">User Anus</a>
      </nav>

      <div className='my-4'>
        <h2 className='font-bold text-sm mb-3 ps-2 mt-6'>User credentials</h2>
        <nav className="space-y-2">
          {loading
          ?<p>loading</p>
          :<a href="#" className="block ps-2 hover:bg-green-50 rounded text-xs hover:border border-green-100
            font-thin"
            >{userData['username']}</a>
          }
          {loading
          ?<p>loading</p>
          :<a href="#" className="block ps-2 hover:bg-green-50 rounded text-xs hover:border border-green-100
            font-medium"
            >Email: {userData['email']}</a>
          }
          {loading
          ?<p>loading</p>
          :<a href="#" className="block ps-2 hover:bg-green-50 rounded text-xs hover:border border-green-100
            font-medium"
            >Team: {userData['belongs_to_team']}</a>
          }
          {loading
          ?<p>loading</p>
          :<p className="block ps-2 rounded text-xs 
            font-medium "
            >Team Acess Level: {userData['team_access_level']}</p>
          }
          {loading
          ?<p>loading</p>
          :<p className="block ps-2 rounded text-xs 
            font-medium"
            >Role in Team: {userData['role']}</p>
          }
        </nav>
        

      </div>
    </div>
  )
}

export default Rightbar
