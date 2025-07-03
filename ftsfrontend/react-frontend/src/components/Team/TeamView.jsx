import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading.jsx'
import moment from 'moment'
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
const TeamView = () => {  //supervisor is a boolean to toggle between team update
  const [teamViewData, setTeamViewData] =useState()
  const [loading, setLoading] = useState(true)
  const {teamId} = useParams() 
  useEffect (()=>{
    const fetchTeamViewData = async ()=>{
      console.log("csrftoken = ", Cookies.get('csrftoken'))
        setLoading(true)
        try {
            const response = await axios.get(`http://127.0.0.1:8000/drf/teams/${teamId}/`,
              {
              headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
              },
              withCredentials: true, // Optional: only needed if cookies are set
              }
            )
            setTeamViewData(response.data)
        } catch (error) {
          console.error("Error fetching team data:", error)
          setTeamViewData()
        } finally {
          setLoading(false)
        }
      }
      fetchTeamViewData()
    }, [])
  return (
    <div>
      {
        loading
        ?<Loading/>
        :<div className='bg-neutral-50 p-4 border border-white'>
          <div className="section-a flex flex-row ">
            <div className='team-section flex flex-col w-full'>
              <h1 className='font-bold flex flex-row justify-start text-3xl'>{teamViewData.name}</h1>
              <div className="team-members-section">
                <h2 className="mt-2 text-gray-700 text-2xl tracking-widest font-semibold mb-2">Team Members</h2>
              </div>

              <div className="flex flex-row member-card border-gray-50 py-5 pe-5">
                <div className="leader-card w-36 h-52 bg-slate-50 border-s-4 border-t-4 border-white shadow-lg rounded-lg p-4 my-3 me-3">
                  <div className="name">
                    <h3 className='text-sm text-gray-700 tracking-wide font-normal'>Normal Name Something Something</h3>
                  </div>
                </div>
                {
                  loading?<Loading/>
                         :teamViewData.workers.map(worker=>(
                          <div className="worker-card w-28 h-32 bg-slate-50 border-s-4 border-t-4 border-white shadow-lg rounded-lg p-2 my-3 me-3">
                            <div className="name">
                              <h3 className='text-sm text-gray-700 tracking-wide font-thin'>{worker.user}</h3>
                            </div>
                          </div>
                        ))
                }
              </div>
            </div>
            <div className="team-level-section flex flex-col bg-stone-50 w-64 h-72 border border-gray-50 rounded-md p-3">
              <div className="flex flex-row">
                <p className="team-level text-sm text-gray-700 tracking-wide font-semibold ">
                Team Level
                <div className="h-0.5 bg-gray-600 w-2/3 mx-auto mt-1"></div>
                </p>
              </div>
              <div className="level-value p-2 flex justify-center items-center">
                <h1 className='font-semibold text-6xl text-zinc-600'>{teamViewData.level}</h1>
              </div>
            </div>
          </div>
          <div className="section-b flex flex-col">
            <div className="section-header">
              <h1 className="mt-2 text-gray-700 text-2xl tracking-widest font-semibold mb-2">Team Files</h1>
            </div>
            <div className="file-parent-card ps-3">
                {
                  loading?<Loading/>
                  :teamViewData.files_owned.map(file=>(
                    <div className="file-card flex flex-row py-4 border  border-gray-100">
                      <p className='text-xs ps-4'>{file.name}</p>
                    </div>
                  ))
                }
            </div>
            
            

          </div>

          
          
        </div>
      }
    </div>
  )
}

export default TeamView
