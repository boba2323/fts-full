import React from 'react'
import { useAuth } from '../../authentication/authProvider.jsx';
const BelongsToTeam = ({teamId}) => {
    const {userIn, setUserIn, hitMeandFetch } = useAuth()
    if (userIn.team?.id?.toString() === teamId.toString()) {
        console.log("yes its the user in team")
        leaveTeam = <div>
                    
                </div> 
  } else {
    leaveTeam =<></>
  }
  return (
    <div>
      
    </div>
  )
}

export default BelongsToTeam
