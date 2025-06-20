import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Team = () => {
  const [teamData, setTeamData] =useState()
  const [loading, setLoading] = useState()

  useEffect =()=>{
    const fetchData = async ()=>{
        setLoading(true)
        try {
            const response = await axios.get('http://127.0.0.1:8000/drf/teams/')
        } catch {

        }
    }

  }
  return (
    <div>
      
    </div>
  )
}

export default Team
