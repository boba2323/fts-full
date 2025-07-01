import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Modal from '../Modal/ModalDeleteTeam';
import Cookies from 'js-cookie';
const AdminAccCodeDelete =() => {
    const [open, setOpen] = useState(true)
    const {id} = useParams()
    const handleDeleteSubmit = async () => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/drf/accesscode/${id}/`, 
                {
                headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
                },
                withCredentials: true, // Optional: only needed if cookies are set
            });
            
            console.log("AC delete successfully!:", response.data)
            if (response.status === 200 || response.status === 204) {
            // success login 
                console.log("AC deleted successfully!:", response.data);
                }
            console.log("AC deleted:", response.data);
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
        target='access code'
        routeToGoBackTo={"/fts/admin/admin-accesscode"} />
    </div>
  )
}

export default AdminAccCodeDelete
