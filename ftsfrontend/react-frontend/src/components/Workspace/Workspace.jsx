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
      This is your workspace. Here you can view your tasks
      <li>
        {loading?<Loading/>:
          userAttribute.teamId?<Link to={`team/${userAttribute.teamId}`}>
                  Team
                </Link>
          :<div>You are not part of any team or leader of a team yet</div>
        }
      </li>
      <div>
        {userIn.is_not_god_only_L2_L3_leader
        ? <div className='flex flex-col'> You cannot upload files until an accesscode and have attached it to your team.
        should we allow the user to create a code? but thatv defeats the purpose. instead he can ask for a code that can be Created
        by his superior or he can create his own code, then upload his own files etc.
            <Link to={`accesscode/create`}>
              <div className='border border-blue-50 inline-block'>Create Access Code</div>
            </Link>
          </div>
        :<></>
        }
        
      </div>
    </div>
  )
}

export default Workspace
