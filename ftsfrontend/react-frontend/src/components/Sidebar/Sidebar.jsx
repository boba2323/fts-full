import { Outlet, Link } from "react-router-dom";
import {useAuth} from "../../authentication/authProvider"
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
    
    <div className="flex flex-col h-screen bg-gray-100 text-gray-600 p-4">
      
      <button onClick={testClick} >usertest</button>
      {userIn.In}
      <h2 className="text-sm font-bold mb-6 ps-2">FTS</h2>
      {userIn.is_supervisor || userIn.is_superuser || userIn.is_Team_L1 || userIn.is_staff
        ?<Link to={`admin`} ><div className="mb-3 block ps-1 hover:bg-green-50 rounded text-sm text-green-800 hover:border border-green-100 font-bold cursor-pointer">Admin</div ></Link>
        :<></>
      }
      <nav>
        {/* https://reactrouter.com/6.28.0/start/tutorial#nesting-routes */}
        <Link to={``} >
          <div className="mb-3 block ps-1 hover:bg-green-50 rounded text-xs  hover:border border-green-100 cursor-pointer">Dashboard</div>
        </Link>
        <Link to={`files`} >
          <div className="my-3 block ps-1 hover:bg-green-50 rounded text-xs hover:border border-green-100 cursor-pointer">Files</div>
        </Link>
        <Link to={`teams`}  >
          <div className="block my-3 ps-1 hover:bg-green-50 rounded text-xs hover:border border-green-100 cursor-pointer">Teams</div>
        </Link>
        <Link to={`users`}>
          <div className="my-3 block ps-1 hover:bg-green-50 rounded text-xs hover:border border-green-100 cursor-pointer">Users</div>
        </Link>
        
        <a href="http://127.0.0.1:5173/logout" className="my-3 block ps-1 hover:bg-red-200 rounded text-xs hover:border border-green-100">Logout</a>
      </nav>
    </div>
  )
}

export default Sidebar

