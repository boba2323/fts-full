import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading.jsx'
import moment from 'moment'
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import ModalSearch from '../Modal/ModalSearch.jsx';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PaginationSticker from '../Pagination/PaginationSticker.jsx';


const Team = ({supervisor}) => {  //supervisor is a boolean to toggle between team update
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const [teamData, setTeamData] =useState([])
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

  const fetchTeamData = async ()=>{
    console.log("csrftoken = ", Cookies.get('csrftoken'))
      setLoading(true)
      try {
          const response = await axios.get(`${API_BASE_URL}/teams/`,
            {
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': Cookies.get('csrftoken')
            },
            withCredentials: true, // Optional: only needed if cookies are set
            }
          )
          // pagination data saved to state
          setResponseData(response.data)
          // -------------------------
          setTeamData(response.data.results)
      } catch (error) {
        console.error("Error fetching file data:", error)
        setTeamData([])
      } finally {
        setLoading(false)
      }
    }

  useEffect (()=>{
    fetchTeamData()
    }, [pageQueryParam])

  const onSearchHandler = (e) => {
    const {name, value} = e.target;
        setPageNumSearch(value)
        setSearchQuery(value)
        console.log("expected search query updated with value from input", searchQuery)
    }
  return (
    <div>
      <div className="liststyle overflow-x-auto">
        <table className=' w-full'>
          <thead>
            <tr className='border-b-2 border-gray-200 h-6'>
                <th className='text-left ps-5 text-xs font-medium font-sans text-gray-700'>Team Name</th>
                <th className='text-left ps-5 text-xs font-medium font-sans text-gray-700'>Date Created</th>
                <th className='text-left ps-5 text-xs font-medium font-sans text-gray-700'>Access Code</th>
                <th className='text-left ps-5 text-xs font-medium font-sans text-gray-700'>Leader</th>
                {supervisor?<th className='text-left ps-5 text-xs font-medium font-sans text-gray-700'>Workers</th>
                :<></>
                }
                <th className='text-left ps-5 text-xs font-medium font-sans text-gray-700'>Level</th>
                {/* <th className='text-left ps-5 text-xs font-medium font-sans text-gray-700'>Role</th> */}
            </tr>
          </thead>
          <tbody>
            {loading
            ? (<tr>
                <td colSpan={4} className="flex justify-center items-center ps-5 py-3 text-sm text-gray-500">
                  <Loading/>
                </td>
              </tr>)
            : (teamData.map((team) => (
                                  <tr key={team.id} className='border-b-2 border-gray-50 h-8'>
                                    <Link to={`/fts/teams/${team.id}`} >
                                      <td className='ps-5 text-xs font-medium font-sans text-gray-700'>{team.name }</td>
                                    </Link>
                                    {/* <td className='ps-5'>{format(new Date(file.date_created), 'dd MMM yyyy')}</td> */}
                                    <td className='ps-5
                                    text-xs font-light font-sans text-gray-700'
                                    >{moment(format(new Date(team.created_at), 'yyyy-MM-dd')).fromNow(true)} ago</td>
                                    <td className='ps-5 text-xs font-medium font-sans text-gray-700'>{team.access_code_code }</td>
                                    <td className='ps-5 text-xs font-medium font-sans text-gray-700'>{team.leader_name }</td>

                                    {supervisor?<td className='ps-5 text-xs font-medium font-sans text-gray-700'>
                                      {team.workers.map((worker)=>{
                                          return (<p key={worker.id} >{worker.user}</p>
                                          )
                                      }) }
                                    </td>
                                      :<></>

                                    }
                                    {/* <td className='ps-5 text-xs font-medium font-sans text-gray-700'>{team.membership_users }</td> */}
                                    
                                    {/* <td className='ps-5 text-xs font-medium font-sans text-gray-700'>{team.memberships }</td> */}
                                    <td className='ps-5 text-xs font-medium font-sans text-gray-700'>{team.level }</td>
                                    {supervisor?<td className='ps-5 text-xs font-medium font-sans text-gray-700'><Link to={`update/${team.id}`} >Update</Link></td>
                                    :<></>
                                    }
                                    {supervisor?<td className='text-xs p-2  font-medium font-sans text-gray-200'><Link to={`delete/${team.id}`} >
                                        <div className='flex justify-center items-center rounded bg-red-500 align-middle p-1'>Delete</div></Link>
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

export default Team
