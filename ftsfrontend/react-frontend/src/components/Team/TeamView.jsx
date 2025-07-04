import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading.jsx'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';

import { FaGrip, FaList } from "react-icons/fa6";

// https://ultimatecourses.com/blog/query-strings-search-params-react-router
import { useSearchParams } from 'react-router-dom';

import moment from 'moment'
import { format } from 'date-fns';

import { Tooltip, Button } from "@material-tailwind/react";

const TeamView = () => {  //supervisor is a boolean to toggle between team update
  const [teamViewData, setTeamViewData] =useState()
  const [extraViewModificationQSData, setExtraViewModificationQSData] = useState([])
  const [filteredModData, setFilteredModData] = useState([])


  const [loading, setLoading] = useState(true)
  const [loadingMod, setLoadingMod] = useState(true)
  const [loadingFilteredMod, setLoadingFilteredMod] = useState(true)

  const {teamId} = useParams() 

  const [searchParamsTeamId, setSearchParamsTeamId] = useSearchParams()

  const [listView, setListView] = useState(true)


  useEffect(()=>{
    const filterModData =()=>{
      // setLoadingFilteredMod(true)
      const fileGroupData = {}
      if (!extraViewModificationQSData) {
        return
      }
      extraViewModificationQSData.map(mod=>{
        const file = mod.file_name_at_modification
        if (!fileGroupData[file]) {
          fileGroupData[file] = [];
        }
        // if the file name is same, then for the same key with file name, the mod object will be pushed into it as value
        fileGroupData[file].push(mod)
      })
      // fileGroupData is a object we need to convert to array
      const fileGroupArray = Object.keys(fileGroupData).map(
        keyFileName=>({
          fileName:keyFileName,
          modifications: fileGroupData[keyFileName]
        })
      )
      setFilteredModData(fileGroupArray)
    }
    filterModData()
  },[extraViewModificationQSData])


  useEffect(()=>{
       //use teamId to filter modification queryset based on users of the teamId
    // const teamIdQuery = searchParamsTeamId.get('teamId')
    // const currentParams = Object.fromEntries([...searchParamsTeamId]);
    if (!teamViewData?.id) {
        return
      }
    const fetchModificationObjects = async ()=>{
      try {
        setLoadingMod(true)
        const responseModification = await axios.get(`http://127.0.0.1:8000/drf/modifications/?teamId=${teamViewData.id}`,
          {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
          },
          withCredentials: true, // Optional: only needed if cookies are set
          }
        )
        setExtraViewModificationQSData(responseModification.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoadingMod(false)
        }
      }
      fetchModificationObjects()
  },[teamViewData?.id])

  useEffect (()=>{
    const fetchTeamViewData = async ()=>{
      console.log("csrftoken = ", Cookies.get('csrftoken'))
        setLoading(true)
        try {
            const responseTeam = await axios.get(`http://127.0.0.1:8000/drf/teams/${teamId}/`,
              {
              headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
              },
              withCredentials: true, // Optional: only needed if cookies are set
              }
            )
            setTeamViewData(responseTeam.data)
// https://ultimatecourses.com/blog/query-strings-search-params-react-router

        } catch (error) {
          console.error("Error fetching data:", error)
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
        :<div className='bg-gray-50 p-4 border border-white'>
          <div className="section-a flex flex-row ">
            <div className='team-section flex flex-col w-full'>
              <h1 className='font-bold flex flex-row justify-start text-3xl'>{teamViewData.name}</h1>
              <div className="team-members-section">
                <h2 className="mt-2 text-gray-700 text-2xl tracking-widest font-semibold mb-2">Team Members</h2>
              </div>

              <div className="flex flex-row member-card border-gray-50 py-5 pe-5">
                <div className="leader-card w-40 h-52 bg-slate-50 border-s-4 border-t-4 border-white shadow-lg rounded-lg p-4 my-3 me-3">
                  <div className="name flex flex-wrap">
                    <h3 className='text-sm text-gray-700 tracking-wide font-semibold flex flex-wrap overflow-hidden'>{teamViewData.leader_name}</h3>
                    <h6 className='text-xs text-gray-500 tracking-wide font-thin'>Team Leader</h6>
                  </div>
                </div>
                {
                  loading?<Loading/>
                         :teamViewData.workers.map(worker=>(
                          <div className="worker-card w-28 h-32 bg-slate-50 border-s-4 border-t-4 border-white shadow-lg rounded-lg pt-4 p-2 my-3 me-3">
                            <div className="name">
                              <h3 className='text-sm text-gray-700 tracking-wide font-light'>{worker.user}</h3>
                              <h6 className='text-xs text-gray-500 tracking-wide font-thin'>Worker</h6>
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
            <div className="file-parent-card ps-3 mb-3">
                {
                  loading?<Loading/>
                  :teamViewData.files_owned.map(file=>
                    // const iso_string = file.date_created
                    // const date = new Date(iso_string).toLocaleDateString()
                    (
                    <div className="file-card flex flex-row py-4 border justify-between border-gray-100">
                      <p className='text-xs ps-4 font-medium font-sans text-gray-700'>{file.name}</p>
                      <p className='text-xs ps-4 font-medium font-sans text-gray-700'>{new Date(file.date_created).toLocaleDateString('en-IN',{
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  ))
                }
            </div>
          </div>
          <div className="section-c flex flex-col">
            <div className="section-header flex flex-row justify-between">
              <h1 className="mt-2 text-gray-700 text-2xl tracking-widest font-semibold mb-2">Modifications Commited By this Team</h1>
              <div className='flex flex-row items-center mx-4 cursor-pointer gap-7'>
                <Tooltip className='border border-blue-gray-50 bg-green-600 shadow-xl' content="Sort by File" placement="top-end">
                  <FaGrip onClick={()=>{setListView(false)}}/> 
                </Tooltip>
                <Tooltip className='border border-blue-gray-50 bg-green-600 shadow-xl' content="List View" placement="top-end">
                  <FaList onClick={()=>{setListView(true)}}/> 
                </Tooltip>
                 {/* TOOLTIP */}
              </div>

            </div>
            {
              listView?<table className="modification ps-3 mb-5 my-3 ms-3 ">
                        <thead>
                          <tr className='border-b-2 border-gray-200 h-6'>
                              <th className='text-left ps-4 text-xs font-medium font-sans text-gray-700'>File Name</th>
                              <th className='text-left ms-24 text-xs font-medium font-sans text-gray-700'>User Modified by</th>
                              <th className='text-left ps-4 text-xs font-medium font-sans text-gray-700'>Date Created</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            loadingMod?<Loading/>
                            :extraViewModificationQSData.map(mod=>
                              // const iso_string = file.date_created
                              // const date = new Date(iso_string).toLocaleDateString()
                              (
                              <tr key={mod.id} className="modifcation-card ps-4 py-4 pe-5 border border-gray-100">
                                <td className='text-xs ps-4 py-4 font-medium font-sans text-gray-700'>{mod.file_name_at_modification}</td>
                                <td className='text-xs ms-24 py-4 font-medium font-sans text-gray-700'>{mod.modified_by_username_at_modification}</td>
                                <td className='text-xs ps-4 font-medium font-sans text-gray-700'>{new Date(mod.date_modified).toLocaleDateString('en-IN',{
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}</td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                      :<div className="section-d flex flex-col">
                        <div className='ps-3 mb-3 flex flex-row flex-wrap gap-8'>
                        {
                          filteredModData.map(fileMod=>(
                          <div className='filemod-block flex flex-col'>
                            <div className="file-mod-card  w-16 h-20 bg-slate-50 border-s-4 border-t-4
                            border-white shadow-lg rounded-lg  
                            cursor-pointer
                            ">
                              <h1 className='text-left p-1 text-xs font-medium font-sans text-gray-700'>{fileMod.fileName}</h1>
                            </div>
                            <h6 className='text-left py-1 text-xs font-thin font-sans text-gray-500 overflow-hidden'>Times modified: {fileMod.modifications.length}</h6>
                          </div>
                          ))
                        }
                        </div>
                      </div> 
            }
            
          </div>
            
        </div>
      }
    </div>
  )
}

export default TeamView
