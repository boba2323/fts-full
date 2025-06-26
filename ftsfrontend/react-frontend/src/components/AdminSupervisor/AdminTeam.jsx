import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading.jsx'
import moment from 'moment'
import { format } from 'date-fns';
import Team from '../Team/Team'

import { useAuth } from '../../authentication/authProvider.jsx';
const AdminTeam = () => {
  const {userIn} = useAuth()
// we only send booleans not values. the team based on the booleans decide if they render the supervisor actions depending from where we are at in the route
  return (
    <div>
      <Team supervisor={userIn.is_supervisor || userIn.is_superuser || userIn.is_Team_L1}/>  
    </div>
  )
}

export default AdminTeam
