import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Modal from '../Modal/ModalDeleteTeam';

const AdminTeamDelete =() => {
    const [open, setOpen] = useState(true)
    const {userId} = useParams()
    const handleDeleteSubmit = async () => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/drf/users/${userId}/`, 
                {
                headers: {
                'Content-Type': 'application/json'
                },
                withCredentials: true, // Optional: only needed if cookies are set
            });
            
            console.log("User deleted!:", response.data)
            if (response.status === 200 || response.status === 204) {
            // success login 
                console.log("User deleted successfully!:", response.data);
                }
            console.log("User deleted :", response.data);
        } catch (error) {
            console.log(error.response)
        } finally {
        }
        }
    
  return (
    <div>
        <Modal open={open} setOpen={setOpen} handleDelete={handleDeleteSubmit} target="user" routeToGoBackTo={"/fts/admin/admin-user"}/>
    </div>
  )
}

export default AdminTeamDelete