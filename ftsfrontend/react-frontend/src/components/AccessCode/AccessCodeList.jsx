import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading.jsx'
import moment from 'moment'
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const AccessCodeList = ({supervisor}) => {  //supervisor is a boolean to toggle between accesscode update
  const [accessCodeData, setAccessCodeData] =useState([])
  const [loading, setLoading] = useState()

  useEffect (()=>{
    const fetchACData = async ()=>{
      console.log("csrftoken = ", Cookies.get('csrftoken'))
        setLoading(true)
        try {
            const response = await axios.get('http://127.0.0.1:8000/drf/accesscode/',
              {
              headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
              },
              withCredentials: true, // Optional: only needed if cookies are set
              }
            )
            setAccessCodeData(response.data)
        } catch (error) {
          console.error("Error fetching AC data:", error)
          setAccessCodeData([])
        } finally {
          setLoading(false)
        }
      }
      fetchACData()
    }, [])
  return (
    <div>
      <div className="liststyle overflow-x-auto">
        <table className=' w-full'>
          <thead>
            <tr className='border-b-2 border-gray-200 h-6'>
                <th className='text-left ps-5 text-xs font-medium font-sans text-gray-700'>Code</th>
                <th className='text-left ps-5 text-xs font-medium font-sans text-gray-700'>Team</th>
                <th className='text-left ps-5 text-xs font-medium font-sans text-gray-700'>Date Created</th>
                {/* <th className='text-left ps-5 text-xs font-medium font-sans text-gray-700'>Created By</th> */}
                <th className='text-left ps-5 text-xs font-medium font-sans text-gray-700'>Expiry Date</th>
                <th className='text-left ps-5 text-xs font-medium font-sans text-gray-700'>Active</th>
   
            </tr>
          </thead>
          <tbody>
            {loading
            ? (<tr>
                <td colSpan={4} className="flex justify-center items-center ps-5 py-3 text-sm text-gray-500">
                  <Loading/>
                </td>
              </tr>)
            : (accessCodeData.map((ac) => (
                                  <tr key={ac.id} className='border-b-2 border-gray-50 h-8'>
                                    <td className='ps-5 text-xs font-medium font-sans text-gray-700'><a href={ac.url}>{ac.code }</a></td>
                                    {/* <td className='ps-5'>{format(new Date(file.date_created), 'dd MMM yyyy')}</td> */}
                                    <td className='ps-5 text-xs font-medium font-sans text-gray-700'>{ac.team_name }</td>
                                    <td className='ps-5
                                        text-xs font-light font-sans text-gray-700'
                                        >{moment(format(new Date(ac.created_at), 'yyyy-MM-dd')).fromNow(true)} ago</td>
                                    {/* <td className='ps-5 text-xs font-medium font-sans text-gray-700'>{team.membership_users }</td> */}
                                    {/* <td className='ps-5 text-xs font-medium font-sans text-gray-700'>{team.memberships }</td> */}
                                    <td className='ps-5 text-xs font-medium font-sans text-gray-700'>{ac.expires_at }</td>
                                    <td className='ps-5 text-xs font-medium font-sans text-gray-700'>{ac.is_active }</td>
                                    {/* {supervisor?<td className='ps-5 text-xs font-medium font-sans text-gray-700'><Link to={`${ac.code}`} >Update</Link></td>
                                    :<></>
                                    }
                                    {supervisor?<td className='text-xs p-2  font-medium font-sans text-gray-200'><Link to={`delete/${ac.code}`} >
                                        <div className='flex justify-center items-center rounded bg-red-500 align-middle p-1'>Delete</div></Link>
                                    </td>
                                    :<></>
                                    } */}
                                  </tr>
                              ))
                            
            )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AccessCodeList
