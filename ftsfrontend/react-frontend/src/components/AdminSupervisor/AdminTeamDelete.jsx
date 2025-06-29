import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Modal from '../Modal/ModalDeleteTeam';
import Cookies from 'js-cookie';
const AdminTeamDelete =() => {
    const [open, setOpen] = useState(true)
    const {teamId} = useParams()
    const handleDeleteSubmit = async () => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/drf/teams/${teamId}/`, 
                {
                headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
                },
                withCredentials: true, // Optional: only needed if cookies are set
            });
            
            console.log("Team created successfully!:", response.data)
            if (response.status === 200 || response.status === 204) {
            // success login 
                console.log("Team deleted successfully!:", response.data);
                }
            console.log("Team deleted created:", response.data);
        } catch (error) {
            console.log(error.response)
        } finally {
        }
        }
    
  return (
    <div>
        <Modal open={open} 
        setOpen={setOpen} 
        handleDelete={handleDeleteSubmit} 
        target='team'
        routeToGoBackTo={"/fts/admin/admin-team"} />
    </div>
  )
}

export default AdminTeamDelete
