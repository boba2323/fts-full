import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading.jsx'
import moment from 'moment'
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Modification = ({supervisor}) => {  //supervisor is a boolean to toggle between team update
  const [modData, setModData] =useState([])
  const [loading, setLoading] = useState()

  useEffect (()=>{
    const fetchModData = async ()=>{
      console.log("csrftoken = ", Cookies.get('csrftoken'))
        setLoading(true)
        try {
            const response = await axios.get('http://127.0.0.1:8000/drf/modifications/',
              {
              headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
              },
              withCredentials: true, // Optional: only needed if cookies are set
              }
            )
            setModData(response.data)
        } catch (error) {
          console.error("Error fetching modification data:", error)
          setModData([])
        } finally {
          setLoading(false)
        }
      }
      fetchModData()
    }, [])
  return (
    <div>
      <div className="liststyle overflow-x-auto">
        <table className=' w-full'>
          <thead>
            <tr className='border-b-2 border-gray-200 h-6'>
                <th className='text-left ps-5 text-xs font-medium font-sans text-gray-700'>File Name</th>
                <th className='text-left ps-5 text-xs font-medium font-sans text-gray-700'>Modified By</th>
                <th className='text-left ps-5 text-xs font-medium font-sans text-gray-700'>Date modified</th>
                <th className='text-left ps-5 text-xs font-medium font-sans text-gray-700'>Permissions</th>
            </tr>
          </thead>
          <tbody>
            {loading
            ? (<tr>
                <td colSpan={4} className="flex justify-center items-center ps-5 py-3 text-sm text-gray-500">
                  <Loading/>
                </td>
              </tr>)
            : (modData.map((modification) => (
                                  <tr key={modification.id} className='border-b-2 border-gray-50 h-8'>
                                    <td className='ps-5 text-xs font-medium font-sans text-gray-700'><a href={modification.url}>{modification.file_name_at_modification }</a></td>
                                    <td className='ps-5 text-xs font-medium font-sans text-gray-700'>{modification.modified_by_username_at_modification }</td>
                                    <td className='ps-5
                                    text-xs font-light font-sans text-gray-700'
                                    >{moment(format(new Date(modification.date_modified), 'yyyy-MM-dd')).fromNow(true)} ago</td>
                                    <td className='ps-5 text-xs font-medium font-sans text-gray-700'>leader {modification.permissions_at_modification }</td>
        
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

export default Modification
