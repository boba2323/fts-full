import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { format } from 'date-fns';
import moment from 'moment';

const FileList = () => {
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
    <div>
      <div className="bg-neutral-50 liststyle overflow-x-auto">
        <table className=' w-full'>
          <thead>
            <tr className='border-b-2 border-gray-200 h-6'>
                <th className='text-left ps-5 text-xs font-medium font-sans text-gray-700'>Name</th>
                <th className='text-left ps-5 text-xs font-medium font-sans text-gray-700'>Date Created</th>
                <th className='text-left ps-5 text-xs font-medium font-sans text-gray-700'>Access Code</th>
                <th className='text-left ps-5 text-xs font-medium font-sans text-gray-700'>Team</th>
                <th className='text-left ps-5 text-xs font-medium font-sans text-gray-700'>Download</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? (<tr>
                  <td colSpan={4} className="ps-5 py-3 text-sm text-gray-500">
                    Loading...
                  </td>
                </tr>)
              : (fileData.map((file) => (
                                    <tr key={file.id} className='border-b-2 border-gray-50 h-8'>
                                      <td className='ps-5 text-xs font-medium font-sans text-gray-700'><a href={file.url}>{file.name }</a></td>
                                      {/* <td className='ps-5'>{format(new Date(file.date_created), 'dd MMM yyyy')}</td> */}
                                      <td className='ps-5
                                      text-xs font-light font-sans text-gray-700'
                                      >{moment(format(new Date(file.date_created), 'yyyy-MM-dd')).fromNow(true)} ago</td>
                                      <td className='ps-5 text-xs font-medium font-sans text-gray-700'>{file.access_code_code }</td>
                                      <td className='ps-5 text-xs font-medium font-sans text-gray-700'>{file.team }</td>
                                      <td className='ps-5 text-xs font-medium font-sans text-gray-700'><a href={file.download_url}>Download</a></td>
                                      
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

export default FileList
