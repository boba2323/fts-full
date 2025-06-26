
import { useAuth } from '../../authentication/authProvider.jsx';
import UserList from '../UsersList/UserList.jsx';


const AdminUser = () => {
    const {userIn} = useAuth()
  return (
    <div>
        <UserList supervisor={userIn.is_supervisor || userIn.is_superuser || userIn.is_Team_L1}/>
    </div>
    )   
}

export default AdminUser
