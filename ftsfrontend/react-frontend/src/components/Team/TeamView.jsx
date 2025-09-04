import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading.jsx'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { FaFileLines } from "react-icons/fa6";
import { FaGrip, FaList } from "react-icons/fa6";
import { FaRegFileLines } from "react-icons/fa6";

// https://ultimatecourses.com/blog/query-strings-search-params-react-router
import { useSearchParams } from 'react-router-dom';

import moment from 'moment'
import { format, parseISO } from 'date-fns';
import { FaUserGear, FaUserPen  } from "react-icons/fa6";
import { Tooltip, Button } from "@material-tailwind/react";
import { useAuth } from '../../authentication/authProvider.jsx';

const TeamView = () => {  //supervisor is a boolean to toggle between team update
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const [teamViewData, setTeamViewData] =useState()
  const [extraViewModificationQSData, setExtraViewModificationQSData] = useState([])
  const [filteredModData, setFilteredModData] = useState([])
  const [accessCodeViewData, setAccessCodeViewData] =useState()

  const [loading, setLoading] = useState(true)
  const [loadingMod, setLoadingMod] = useState(true)
  const [loadingFilteredMod, setLoadingFilteredMod] = useState(true)

  const {teamId} = useParams() 

  const [searchParamsTeamId, setSearchParamsTeamId] = useSearchParams()

  const [listView, setListView] = useState(true)
  

  
  const {userIn, setUserIn, hitMeandFetch } = useAuth()
  let addFiles = null
  let leaveTeam = null
  let editTeam= null
  if (userIn.team?.id?.toString() === teamId.toString()){
    // console.log("yes its the user in team")
    leaveTeam = <div>
                  <div className="leave-button flex items-center justify-center text-xs
                    text-gray-700 tracking-wide font-semibold cursor-pointer mb-3">
                    <Link to={`/fts/workspace/teammembership/delete/${teamId}`} >
                    <p className=' flex items-center justify-center p-1 rounded cursor-pointer hover:text-orange-600'>
                      Leave Team</p>
                      
                    </Link>
                  </div>
              </div> 
  } else {
    leaveTeam =<></>
  }

  if (userIn.team?.id?.toString() === teamId.toString() || userIn.is_god){
    // console.log("yes its the user in team")
    editTeam = <div>
                <div className="addworker-button flex items-center justify-center text-xs
                text-gray-700 tracking-wide font-semibold ">
                  <Link to={`/fts/workspace/team/update/${teamId}`} >
                    <p className=' flex items-center justify-center p-1 rounded cursor-pointer hover:text-purple-400 mt-6'>
                      Edit Team</p>
                  </Link>
                </div>
              </div> 
  } else {
    editTeam =<></>
  }

  if (userIn.team?.id?.toString() === teamId.toString()){
    addFiles= <Link to={`/fts/workspace/team/${teamId}/files-upload`}>
                  <div className=' flex flex-row text-gray-700 text-sm 
                  items-center hover:text-purple-500 cursor-pointer font-semibold p-1 rounded my-2'>
                      Upload Files
                  </div>
              </Link> 

  }

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
        const responseModification = await axios.get(`${API_BASE_URL}/modifications/?teamId=${teamViewData.id}`,
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
      // console.log("csrftoken = ", Cookies.get('csrftoken'))
        setLoading(true)
        try {
            const responseTeam = await axios.get(`${API_BASE_URL}/teams/${teamId}/`,
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


    // fetch accesscode
  useEffect (()=>{
    const fetchAccessViewData = async ()=>{
    // console.log("csrftoken = ", Cookies.get('csrftoken'))
      setLoading(true)
      if (!teamViewData){
        return
      }
      try {
        // console.log("codes")
        // console.log("codes",teamViewData.access_codes[0])
          const responseAccess = await axios.get(teamViewData.access_codes,
            {
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': Cookies.get('csrftoken')
            },
            withCredentials: true, // Optional: only needed if cookies are set
            }
          )
          setAccessCodeViewData(responseAccess.data)
// https://ultimatecourses.com/blog/query-strings-search-params-react-router

      } catch (error) {
        console.error("Error fetching data:", error)
        setAccessCodeViewData()
      } finally {
        setLoading(false)
      }
    }
    fetchAccessViewData()
  }, [teamViewData])

  // https://stackoverflow.com/questions/69265989/format-date-with-date-fns
  // https://date-fns.org/v2.24.0/docs/format
  const date_created =accessCodeViewData?.created_at?format(parseISO(accessCodeViewData.created_at), 'dd.MMM.yyyy h:mm aaa'):''
  const test = 'ok'

  return (
    <div>
      {
        loading
        ?<Loading/>
        :<div className='bg-white p-4 border border-white'>
          <div className="section-a flex flex-row ">
            <div className='team-section flex flex-col w-full'>
              <h1 className='font-bold flex flex-row justify-start text-3xl text-gray-800'>{teamViewData.name}</h1>
              <div className="team-members-section">
                <h2 className="mt-2 text-gray-700 text-2xl tracking-widest font-semibold mb-2">Team Members</h2>
              </div>

              <div className="flex flex-row member-card border-gray-50 py-5 pe-5">
                <div className="leader-card w-40 h-52 border border-gray-100 shadow-lg shadow-purple-50 rounded-lg">
                  <div className="name flex flex-col flex-wrap justify-center items-center h-full">
                    <FaUserGear size='50' className='text-gray-500'/>
                    <h3 className='text-sm text-gray-700 tracking-wide font-semibold flex flex-wrap overflow-hidden pt-5'>
                      {teamViewData.leader_name}</h3>
                    <h6 className='text-xs text-gray-500 tracking-wide font-thin pt-3'>Team Leader</h6>
                  </div>
                </div>
                <div className='flex flex-wrap'>
                  {
                  loading?<Loading/>
                         :teamViewData.workers.map(worker=>(
                          <div className="worker-card w-28 h-32 border border-gray-100 shadow-lg shadow-purple-50 rounded-lg  
                          max-w-28 min-w-28  p-2 ms-6 my-3 me-3">
                            <div className="name flex flex-col flex-wrap justify-center items-center h-full">
                              <FaUserPen size='25' className='text-gray-500'/>
                              <h3 className='text-xs text-gray-700 tracking-wide font-semibold flex flex-wrap overflow-hidden pt-2'>
                                {worker.user}</h3>
                              <h6 className='text-xs text-gray-500 tracking-wide font-thin pt-1'>Worker</h6>
                            </div>
                          </div>
                        ))
                  }
                </div>
              </div>
            </div>
            <div className="team-level-section flex flex-col bg-stone-50 w-64 h-full border border-[#f5f5f5] rounded-md p-3">
              <div className="flex flex-row">
                <p className="team-level text-sm text-gray-700 tracking-wide font-semibold ">
                Team Level
                <div className="h-0.5 bg-gray-600 w-2/3 mx-auto mt-1"></div>
                </p>
              </div>
              <div className="level-value p-2 flex justify-center items-center">
                <h1 className='font-semibold text-6xl text-gray-800'>{teamViewData.level}</h1>
              </div>
              {leaveTeam}
              {editTeam}
              <div className="addworker-button flex flex-col items-start justify-center text-xs
              text-gray-700 tracking-wide font-light ">
                {userIn.team?.id?.toString() === teamId.toString()
                ?<>
                  <p className=' flex flex-row items-start justify-start px-1 rounded  mt-6 font-bold'>
                      AccessCode:</p>
                    <p className=' flex items-center justify-center p-1 
                    text-gray-800
                    rounded cursor-pointer hover:text-deep-purple-600'>
                      {teamViewData.ac_presentor}</p>
                    <p className=' flex flex-col items-start justify-center p-1 rounded  mt-1 '>
                      <span className='font-bold pb-1'>Created:</span> {date_created}</p>
                    </>
                :<></>}
              </div>
              
            </div>
            
          </div>

          <div className="section-b flex flex-col pb-16 pt-8">
            <div className="section-header flex flex-row justify-between">
              <h1 className="mt-2 text-gray-700 text-2xl tracking-widest font-semibold mb-2">Team Files</h1>
              {addFiles}
            </div>
            <div className="file-parent-card ps-3 mb-3">
            {userIn.team?.id?.toString() === teamId.toString() || userIn.is_god
            ?loading?<Loading/>
            :<table className='file w-full mb-5 my-3 '>
                <thead>
                  <tr className='border-b-2 border-gray-200 h-6'>
                    <th className='text-left w-1/2 ps-4 text-xs font-medium font-sans text-gray-700'>File Name</th>
                    <th className='text-left w-1/2 text-xs font-medium font-sans text-gray-700'>Date uploaded</th>
                  </tr>
                </thead>
                <tbody>
                  {teamViewData.files_owned.map(file=>
                    // const iso_string = file.date_created
                    // const date = new Date(iso_string).toLocaleDateString()
                    (
                    <tr key={file.id} className="file-card py-4 border border-gray-100">
                      <td className='text-xs ps-4 py-4 font-medium font-sans text-gray-700'>{file.name}</td>
                      <td className='text-xs  py-4 font-medium font-sans text-gray-700'>{new Date(file.date_created).toLocaleDateString('en-IN',{
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            :<></>}              
                
            </div>
          </div>
          <div className="section-c flex flex-col pb-20 mt-15">
            <div className="section-header flex flex-row justify-between">
              <h1 className="mt-2 text-gray-700 text-2xl tracking-widest font-semibold mb-2">Modifications Commited By this Team</h1>
              <div className='flex flex-row items-center mx-4  gap-7'>
                <Tooltip className='border border-gray-400 bg-white shadow-sm text-gray-700' content="Sort by File" placement="top-end">
                  <FaGrip onClick={()=>{setListView(false)}} className='cursor-pointer'/> 
                </Tooltip>
                <Tooltip className='border border-gray-400 bg-white shadow-sm text-gray-700' content="List View" placement="top-end">
                  <FaList onClick={()=>{setListView(true)}} className='cursor-pointer'/> 
                </Tooltip>
                 {/* TOOLTIP */}
              </div>
            </div>
              {userIn.team?.id?.toString() === teamId.toString() || userIn.is_god
              ?listView?<table className="modification ps-3 mb-5 my-3 ms-3 ">
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
                            <div className="file-mod-card  w-20 h-24
                            cursor-pointer hover:bg-gray-100 rounded-sm
                            flex flex-col justify-center items-center
                            pt-4
                            ">
                              <FaRegFileLines className='text-gray-600' size='35'/>
                              <h1 className='text-left p-1 text-xs font-medium font-sans text-gray-600 pt-2'>
                                {fileMod.fileName}</h1>
                            </div>
                            <h6 className='text-left py-1 text-xs font-thin font-sans text-gray-500 overflow-hidden'>Times modified: {fileMod.modifications.length}</h6>
                          </div>
                          ))
                        }
                        </div>
                      </div> 
              :<></>
              }           
          </div>
            
        </div>
      }
    </div>
  )
}

export default TeamView
