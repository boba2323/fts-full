import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Modal from '../Modal/ModalDeleteTeam';
import Cookies from 'js-cookie';
import { useAuth } from '../../authentication/authProvider'

const DeleteSelfMembership = () => {
    const {userIn,  setUserIn, loading, hitMeandFetch} = useAuth()
    const [open, setOpen] = useState(true)

    let deleteMessage = ''
    if (userIn.role === "worker") {
      deleteMessage = "You are leaving this team. Confirm you want to leave"
    } else if (userIn.role === "leader") {
      deleteMessage = "Are you sure you want to leave your team? The team will be entirely deleted when the leader leaves"
    } else{
      deleteMessage= "You have no role, how on earth are you even here..."
    }


      
    const handleDeleteMembershipSubmit = async () => {
        try {
          console.log("membership url" ,userIn.memberships)
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
        message={deleteMessage} />
    </div>
    </div>
  )
}

export default DeleteSelfMembership
