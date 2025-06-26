import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading.jsx'
import moment from 'moment'
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const AdminUser = () => {
    const [userData, setUserData] =useState([])
    const [loading, setLoading] = useState()
    
    useEffect (()=>{
    const fetchTeamData = async ()=>{
        setLoading(true)
        try {
            const response = await axios.get('http://127.0.0.1:8000/drf/users/',
                {
                headers: {
                'Content-Type': 'application/json'
                },
                withCredentials: true, // Optional: only needed if cookies are set
                }
            )
            setUserData(response.data)
        } catch {
            console.error("Error fetching file data:", error)
            setUserData([])
        } finally {
            setLoading(false)
        }
        }
        fetchTeamData()
    }, [])
  return (
    <div>
        <div className="liststyle overflow-x-auto">
        <table className=' w-full'>
            <thead>
            <tr className='border-b-2 border-gray-200 h-6'>
                <th className='text-left ps-5 text-xs font-medium font-sans text-gray-700'>User Name</th>
                <th className='text-left ps-5 text-xs font-medium font-sans text-gray-700'>Email</th>
                <th className='text-left ps-5 text-xs font-medium font-sans text-gray-700'>Team</th>
                <th className='text-left ps-5 text-xs font-medium font-sans text-gray-700'>Team Access Level</th>
                <th className='text-left ps-5 text-xs font-medium font-sans text-gray-700'>Access Code</th>
                <th className='text-left ps-5 text-xs font-medium font-sans text-gray-700'>Role</th>
            </tr>
            </thead>
            <tbody>
            {loading
            ? (<tr>
                <td colSpan={6} className="flex justify-center items-center ps-5 py-3 text-sm text-gray-500">
                    <Loading/>
                </td>
                </tr>)
            : (userData.map((user) => (
                                    <tr key={user.id} className='border-b-2 border-gray-50 h-8'>
                                        <td className='ps-5 text-xs font-medium font-sans text-gray-700'><a href={user.url}>{user.username }</a></td>
                                        <td className='ps-5 text-xs font-medium font-sans text-gray-700'>{user.email }</td>
                                        {/* <td className='ps-5
                                        text-xs font-light font-sans text-gray-700'
                                        >{moment(format(new Date(user.created_at), 'yyyy-MM-dd')).fromNow(true)} ago</td> */}
                                        <td className='ps-5 text-xs font-medium font-sans text-gray-700'>{user.belongs_to_team }</td>
                                        <td className='ps-5 text-xs font-medium font-sans text-gray-700'>{user.team_access_level }</td>
                                        <td className='ps-5 text-xs font-medium font-sans text-gray-700'>{user.access_code }</td>
                                        <td className='ps-5 text-xs font-medium font-sans text-gray-700'>{user.role }</td>
                                        {/* <td className='ps-5 text-xs font-medium font-sans text-gray-700'>
                                            {user.workers.map((worker)=>{
                                                return (<p key={user.id} >{user.user}</p>
                                                )
                                            }) }
                                        </td> */}
                                        
                                        {/* {supervisor?<td className='ps-5 text-xs font-medium font-sans text-gray-700'><Link to={`${user.id}`} >Update</Link></td>
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

export default AdminUser
