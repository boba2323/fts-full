import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../authentication/authProvider'
import axios from 'axios'
import Loading from '../Loading/Loading'

const Workspace = () => {
  const [userAttribute, setUserAttribute] = useState({
    teamId:null,
    accessCode:null,
    modification:null,
    workers:null
  })
  const { userIn, setUserIn, loading, hitMeandFetch} = useAuth()
  useEffect( ()=>{ // get the team of the user if it exist, first step
    
    const getUserAllDataStatus = async()=>{
      // await hitMeandFetch()
      if (userIn?.team){
        const teamId = userIn.team.id 
        setUserAttribute(prev =>({
          ...prev,
          teamId:teamId
        }))
      } else {
        setUserAttribute(prev=>({
          ...prev,
          teamId:null
        }))
      }
    }
    getUserAllDataStatus()
  }, [userIn])
  console.log(userIn.team)

  return (
    <div>
      This is your workspace. Here you can view your 
      <li>
        {loading?<Loading/>:
          userAttribute.teamId?<Link to={`team/${userAttribute.teamId}`}>
                  Team
                </Link>
          :<div>You are not part of any team or leader of a team yet</div>
        }
      </li>
    </div>
  )
}

export default Workspace
