import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Modal from '../Modal/ModalDeleteTeam';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from '../../authentication/authProvider';

const AdminUserDelete =() => {
    const {userIn} = useAuth()
    const API_BASE_URL = import.meta.env.VITE_API_URL;
    const [open, setOpen] = useState(true)
    const {userId} = useParams()
    const handleDeleteSubmit = async () => {
        try {
            if (userIn.username=='a4'){
            const showToastMessage = () => {
                toast.error("You cannot delete this user!", {
                position: "bottom-right"
            });
            };
            showToastMessage()
            return;
            }
            const response = await axios.delete(`${API_BASE_URL}/users/${userId}/`, 
                {
                headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
                },
                withCredentials: true, // Optional: only needed if cookies are set
            });
            
            console.log("User deleted!:", response.data)
            if (response.status === 200 || response.status === 204) {
                const showToastMessage = () => {
                    toast.success("User deleted!", {
                    position: "bottom-right"
                });
            };
            showToastMessage()
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
        {/* <ToastContainer /> */}
        <Modal open={open} setOpen={setOpen} handleDelete={handleDeleteSubmit} target="user" routeToGoBackTo={"/fts/admin/admin-user"} message = "You will not recover the user"/>
    </div>
  )
}

export default AdminUserDelete