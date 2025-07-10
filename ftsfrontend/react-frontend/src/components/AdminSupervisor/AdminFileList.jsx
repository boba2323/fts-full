import React from 'react'
import FileList from '../File/FileList'
import { useAuth } from '../../authentication/authProvider'

const AdminFileList = () => {
    const {userIn} = useAuth()
  return (
    <div>
      <FileList supervisor={userIn.is_supervisor || userIn.is_superuser || userIn.is_Team_L1}/>
    </div>
  )
}

export default AdminFileList
