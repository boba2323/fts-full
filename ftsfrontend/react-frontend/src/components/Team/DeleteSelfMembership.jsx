import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Modal from '../Modal/ModalDeleteTeam';
import Cookies from 'js-cookie';
import { useAuth } from '../../authentication/authProvider'

const DeleteSelfMembership = () => {
    const {userIn,  setUserIn, loading, hitMeandFetch} = useAuth()
    const [open, setOpen] = useState(true)
    console.log("membership url" ,userIn.memberships[0])  
    const handleDeleteMembershipSubmit = async () => {
        try {
          console.log("membership url" ,userIn.memberships[0])
          const response = await axios.delete(userIn.memberships[0], 
              {
              headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': Cookies.get('csrftoken')
              },
              withCredentials: true, // Optional: only needed if cookies are set
          });
          
          console.log("Membership deleted successfully!:", response.data)
          hitMeandFetch()
          console.log("delete membership", userIn)
        } catch (error) {
            console.error("delete membership failed", error)
            hitMeandFetch()
        } finally {
          hitMeandFetch()
        }
    }
  return (
    <div>
      <div>
        <Modal open={open} 
        setOpen={setOpen} 
        handleDelete={handleDeleteMembershipSubmit} 
        target='membership'
        routeToGoBackTo={"/fts/dashboard"}
        message="Are you sure you want to leave your team? The team will be entirely deleted when the leader leaves" />
    </div>
    </div>
  )
}

export default DeleteSelfMembership
