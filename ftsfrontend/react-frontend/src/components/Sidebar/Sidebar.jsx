import { Outlet, Link } from "react-router-dom";
import {useAuth} from "../../authentication/authProvider"
import { AiOutlineAppstore } from "react-icons/ai";
import { AiOutlineDesktop } from "react-icons/ai";
import { AiOutlineDatabase } from "react-icons/ai";
import { AiOutlineTeam } from "react-icons/ai";
import { FaPuzzlePiece } from 'react-icons/fa';
import { AiOutlineLogout } from "react-icons/ai";

const Sidebar = ({
    onClickHandler
  }) => {
  const { userIn, setUserIn, loading, hitMeandFetch } = useAuth();
  const onClickHandlerNative =()=>{
    // console.log(isUpload)
    // if (isUpload){
    //   onClickHandler()
    //   }
      
    // console.log("in side bar,uploading is", isUpload)
    }

  const testClick =()=>{
    if (userIn.is_supervisor || userIn.is_superuser || userIn.is_Team_L1 || userIn.is_staff) {
      alert("youre a super")
    } else {
      alert("youre a serf")
    }
  }
  return (
    
    <div className="flex flex-col h-screen bg-white text-gray-600 p-4 border-r border-gray-200">
      <div className="flex flex-row justify-start">
        <button className="mb-3 block ps-2 hover:bg-green-50 rounded text-xs  hover:border border-green-100 cursor-pointer" onClick={testClick} >usertest</button>
      </div>
      {userIn.In}
      {/* <h2 className="text-sm font-bold mb-6 ps-2">FTS</h2> */}
      {userIn.is_supervisor || userIn.is_superuser || userIn.is_Team_L1 || userIn.is_staff
        ?<Link to={`admin`} ><div className="mb-3 block ps-1 hover:bg-green-50 rounded text-sm text-green-800 hover:border border-green-100 font-bold cursor-pointer">Admin</div ></Link>
        :<></>
      }
      <nav className="space-y-1">
        {/* https://reactrouter.com/6.28.0/start/tutorial#nesting-routes */}
        <Link to={``} className="block" >
        <div className="flex flex-row items-center px-3 py-2 rounded-md hover:bg-light-blue-50 cursor-pointer">
          <AiOutlineAppstore size={22}/>
          <div className=" flex flex-row items-center ps-4 text-xs ">Dashboard</div>
        </div>
        </Link>

        <Link to={`workspace`} className="block">
        <div className="flex flex-row items-center px-3 py-2 rounded-md hover:bg-light-blue-50 cursor-pointer">
          <AiOutlineDesktop size={22}/>
          <div className="flex flex-row items-center ps-4 text-xs">Workspace</div>
        </div>
        </Link>

        <Link to={`files`} className="block">
        <div className="flex flex-row items-center px-3 py-2 rounded-md hover:bg-light-blue-50 cursor-pointer">
          <AiOutlineDatabase size={21}/>
          <div className=" flex flex-row items-center ps-4 text-xs">Files</div>
        </div>
        </Link>

        <Link to={`teams`} className="block" >
        <div className="flex flex-row items-center px-3 py-2 rounded-md hover:bg-light-blue-50 cursor-pointer">
          <FaPuzzlePiece  size={20}/>
          <div className="flex flex-row items-center ps-4 text-xs">Teams</div>
        </div>
        </Link>

        <Link to={`users`} className="block">
        <div className="flex flex-row items-center px-3 py-2 rounded-md hover:bg-light-blue-50 cursor-pointer">
          <AiOutlineTeam size={22}/>
          <div className="flex flex-row items-center ps-4 text-xs">Users</div>
        </div>
        </Link>
        <div className="flex flex-row items-center px-3 py-3 rounded-md hover:bg-deep-orange-50 cursor-pointer">
          <AiOutlineLogout/>
          <a href="http://127.0.0.1:5173/logout" className="block text-xs ps-5 ">Logout</a>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar

