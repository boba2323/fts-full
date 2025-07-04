import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { format } from 'date-fns';
import moment from 'moment';

const DashboardMain = () => {
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
    <div className='p-3'>
      <h1>welcome to fts</h1>
      <h3>hello, FTS helps you organise teams and control what parts of your databse they can access</h3>
      
      lets get you started.
      you can create a team, invite existing users to join provided they are not part of any other Team
      once you made the team, you can make an access code and assign it to your team
      then you can upload files and sign it with your code!
      now you control them completely. as leader, dont forget you can invite workers to your team who can work with you 
      on the files you own!
    </div>
  )
}

export default DashboardMain
