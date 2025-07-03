import Modification from '../Modification/Modification.jsx';
import { useAuth } from '../../authentication/authProvider.jsx';

const AdminModification= () => {
  const {userIn} = useAuth()
// we only send booleans not values. the team based on the booleans decide if they render the supervisor actions depending from where we are at in the route
  return (
    <div>
      <Modification supervisor={userIn.is_supervisor || userIn.is_superuser || userIn.is_Team_L1}/>  
    </div>
  )
}

export default AdminModification