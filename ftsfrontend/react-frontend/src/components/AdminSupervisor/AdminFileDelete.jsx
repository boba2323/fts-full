import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Modal from '../Modal/ModalDeleteTeam';
import Cookies from 'js-cookie';

const AdminFileDelete =() => {
    const [open, setOpen] = useState(true)
    const {fileId} = useParams()
    const handleDeleteSubmit = async () => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/drf/files/${fileId}/`, 
                {
                headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
                },
                withCredentials: true, // Optional: only needed if cookies are set
            });
            
            console.log("File successfully deleted!:", response.data)
            if (response.status === 200 || response.status === 204) {
            // success login 
                console.log("File deleted successfully!:", response.data);
                }
            console.log("File deleted", response.data);
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
        target='file'
        message="This will delete the file from the database permanently. Do you wish to proceed?"
        routeToGoBackTo={"/fts/admin/admin-files"} />
    </div>
  )
}

export default AdminFileDelete