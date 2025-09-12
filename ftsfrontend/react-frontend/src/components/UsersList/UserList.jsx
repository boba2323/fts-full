import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading.jsx'
import moment from 'moment'
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import ModalSearch from '../Modal/ModalSearch.jsx';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PaginationSticker from '../Pagination/PaginationSticker.jsx';

const UserList = ({supervisor}) => {
    const API_BASE_URL = import.meta.env.VITE_API_URL;
    
    const [userData, setUserData] =useState([])
    const [loading, setLoading] = useState()

    // modal state definition
    const [open, setOpen] = useState(false)

    // pagination state definitions
    const [responseData, setResponseData] = useState({})
    const [pageNumSearch, setPageNumSearch] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams();

    const pageQueryParam = searchParams.get("page");
    const [searchQuery, setSearchQuery] = useState(pageQueryParam || "");
    const pageSize = 10; // <- match your DRF PAGE_SIZE
    const navigate = useNavigate();

    const clickSearch = (event) =>{
        //onclick function wrapping the fetchuserdata to be passed to teh modal
        setSearchParams({page: searchQuery})

        console.log( "page number entered into the search",pageNumSearch)
        console.log("search params after setting it", searchParams.get("page"))
        navigate(`?page=${searchQuery}`)
    }

    const fetchUserData = async ()=>{
        setLoading(true)
        try {
            const response = await axios.get(`${API_BASE_URL}/users/?page=${searchQuery}`,
                {
                headers: {
                'Content-Type': 'application/json'
                },
                withCredentials: true, // Optional: only needed if cookies are set
                }
            )
            // pagination data saved to state
            setResponseData(response.data)
            // -------------------------

            setUserData(response.data.results)

        } catch (error){
            console.error("Error fetching file data:", error)
            setUserData([])
        } finally {
            setLoading(false)
        }
        }

    useEffect (()=>{
            fetchUserData()
        }, [pageQueryParam])

    // pagination modal serach handler
    const onSearchHandler = (e) => {
        const {name, value} = e.target;
            setPageNumSearch(value)
            setSearchQuery(value)
            console.log("expected search query updated with value from input", searchQuery)
        }

  return (
    <div className=''>
        <div className="liststyle overflow-x-auto pb-20">
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
                <tbody className=''>
                {loading
                ? (<tr>
                    <td colSpan={6} className="flex justify-center items-center ps-5 py-3 text-sm text-gray-500">
                        <Loading/>
                    </td>
                    </tr>)
                :(userData.map(
                (user) => 
                (
                <tr key={user.id} className='border-b-2 border-gray-50 h-8'>
                    <td className='ps-5 text-xs font-medium font-sans text-gray-700'><a>{user.username }</a></td>
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
                    {supervisor?<td className='text-xs p-2  font-medium font-sans text-gray-200'><Link to={`delete/${user.id}`} >
                            <div className='flex justify-center items-center rounded bg-white border
                            border-red-500 hover:bg-red-200 text-gray-700 align-middle p-1'>Delete</div></Link>
                        </td>
                    :<></>
                    }
                </tr>
                ))
                )
                }
                </tbody>
            </table>
            <div >
                <ModalSearch 
                    open={open}
                    setOpen={setOpen}
                    inputPgNum={pageNumSearch}
                    onClickStartSearch ={clickSearch}
                    onChange={onSearchHandler}
                    maxPageNum={ Math.ceil(responseData.count / pageSize)}
                />
                <PaginationSticker
                    responseData={responseData}
                    onClick={()=>{
                            setOpen(true)
                            }}
                    pageQueryParam={pageQueryParam}
                />  
            </div>
        </div>
    </div>
    )   
}

export default UserList
