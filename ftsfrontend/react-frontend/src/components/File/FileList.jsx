import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { format } from 'date-fns';
import moment from 'moment';
import { Link } from 'react-router-dom';

import ModalSearch from '../Modal/ModalSearch.jsx';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PaginationSticker from '../Pagination/PaginationSticker.jsx';

const FileList = ({supervisor}) => {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const [fileData, setData] = useState([])
  const [loading, setLoading] = useState(true);

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

  // fetch file data from the API
  const fetchData = async ()=>{
      setLoading(true)
      try {
        const response = await axios.get(`${API_BASE_URL}/files/?page=${searchQuery}`,
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

          // add .results to file data state
          setData(response.data.results)
        } catch (error) {
          console.error("Error fetching file data:", error)
          setData([])
        } finally {
          setLoading(false)
        }
      }

  useEffect(()=>{
    fetchData()
  }, [pageQueryParam])

  // pagination modal serach handler
    const onSearchHandler = (e) => {
      const {name, value} = e.target;
          setPageNumSearch(value)
          setSearchQuery(value)
          console.log("expected search query updated with value from input", searchQuery)
      }

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
                                      <td className='ps-5 text-xs font-medium font-sans text-gray-700'><a>{file.name }</a></td>
                                      {/* <td className='ps-5'>{format(new Date(file.date_created), 'dd MMM yyyy')}</td> */}
                                      <td className='ps-5
                                      text-xs font-light font-sans text-gray-700'
                                      >{moment(format(new Date(file.date_created), 'yyyy-MM-dd')).fromNow(true)} ago</td>
                                      <td className='ps-5 text-xs font-medium font-sans text-gray-700'>{file.access_code_code }</td>
                                      <td className='ps-5 text-xs font-medium font-sans text-gray-700'>{file.team }</td>
                                      <td className='ps-5 text-xs font-medium font-sans text-gray-700'><a href={file.download_url}>Download</a></td>
                                      {supervisor
                                        ?<td className='text-xs p-2  font-medium font-sans text-gray-200'><Link to={`delete/${file.id}`} >
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

export default FileList
