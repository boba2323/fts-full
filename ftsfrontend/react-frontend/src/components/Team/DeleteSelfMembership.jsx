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
          // if (response.status === 200 || response.status === 204) {
          // // success login 
          //     console.log("Membership deleted successfully!!:", response.data);
          //     }
          // console.log("Membership deleted successfully!:", response.data);

          hitMeandFetch()
          // const fetchMeAgain = await axios.get('http://127.0.0.1:8000/accounts/me/', {
          //     headers: {
          //       'Content-Type': 'application/json'
          //       },
          //     withCredentials: true, // Optional: only needed if cookies are set
              
          //     })
          // setUserIn(fetchMeAgain.data) 
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
        routeToGoBackTo={"/fts/dashboard"} />
    </div>
    </div>
  )
}

export default DeleteSelfMembership
