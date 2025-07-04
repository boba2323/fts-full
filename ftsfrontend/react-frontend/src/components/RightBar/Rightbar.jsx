import React, { useEffect, useState } from 'react'
import axios from "axios";
import { data, useParams } from 'react-router-dom';


// https://dev.to/darkmavis1980/fetching-data-with-react-hooks-and-axios-114h
const Rightbar = () => {
  const [userData, setData] = useState()
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState()

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
          // we get the team detail from the api and store it
          if (response.data.team){
              const responseTeam =await axios.get(`http://127.0.0.1:8000/drf/teams/${response.data['team']['id']}`,
                {
              headers: {
                'Content-Type': 'application/json'
              },
              withCredentials: true, // Optional: only needed if cookies are set
              }
              )
              setTeam(responseTeam.data)
          } else {
            console.log("teamapi not accessed")
          }
        } catch (error) {
          console.error("Error fetching data:", error)
          setTeam()
          setData(error.message)
        } finally {
          setLoading(false)
        }
      }
    fetchData()
  }, [])
  
  

  return (
    <div className="flex flex-col h-screen bg-green-50 text-green-900 pb-4">
      <div className='mb-4'>
        <h2 className='font-bold text-sm mb-3 ps-2 mt-6'>User credentials</h2>
        <nav className="space-y-2">
          {loading
          ?<p>loading</p>
          :<a href="#" className="block ps-2 hover:bg-green-50 rounded text-sm hover:border border-green-100
            font-bold"
            >{userData.username}</a>
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
      <h2 className="text-sm font-bold mb-6 ps-2">{loading
                                                ?<p>loading</p>
                                                : 
                                                    <p className='font-bold text-sm'><span className='font-light text-sm'>Team Name:</span> {userData['belongs_to_team']}</p>
                                                  }</h2>
      <nav className="space-y-3">
        {/* {loading
        ? <p>loading</p>
        :<a href="#" className="block ps-2 hover:bg-green-50 rounded text-xs hover:border border-green-100">User Name: {userData['username']}</a>
        } */}
        
        {loading
        ? <p>loading</p>
        :<a href="#" className="block ps-2 hover:bg-green-50 rounded text-xs hover:border border-green-100">Team Level: {team?.level}</a>
        }
        {loading
        ? <p>loading</p>
        :<div className="block ps-2 rounded text-xs  border-green-100">
          <span className='font-normal mb-3'>Team Workers:</span> {team?.workers
          ? team.workers.map((worker)=>(
            <span className='mt-2 me-1'key={worker.id} >
              {worker.user} 
            </span>
          ))
          : ""
          }</div>
        }
        {loading
        ? <p>loading</p>
        :<a href="#" className="block ps-2 hover:bg-green-50 rounded text-xs hover:border border-green-100">Team Access Code: {team?.access_code_code}</a>
        }
      </nav>

  
    </div>
  )
}

export default Rightbar
