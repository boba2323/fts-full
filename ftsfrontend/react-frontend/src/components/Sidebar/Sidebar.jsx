import { Outlet, Link } from "react-router-dom";
const Sidebar = ({onClickHandler}) => {

  const onClickHandlerNative =()=>{
    // console.log(isUpload)
    // if (isUpload){
    //   onClickHandler()
    //   }
      
    // console.log("in side bar,uploading is", isUpload)
    }
  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-600 p-4">
      <h2 className="text-sm font-bold mb-6 ps-2">FTS</h2>
      <nav className="space-y-3">
        {/* https://reactrouter.com/6.28.0/start/tutorial#nesting-routes */}
        <Link to={`files`} >
          <div onClick={onClickHandlerNative} className="block ps-1 hover:bg-green-50 rounded text-xs hover:border border-green-100 cursor-pointer">Dashboard</div>
        </Link>
        
        <div className="block ps-1 hover:bg-green-50 rounded text-xs hover:border border-green-100 cursor-pointer">Files</div>
        <div className="block ps-1 hover:bg-green-50 rounded text-xs hover:border border-green-100 cursor-pointer">Teams</div>
        <div className="block ps-1 hover:bg-green-50 rounded text-xs hover:border border-green-100 cursor-pointer">Settings</div>
        <a href="http://127.0.0.1:5173/logout" className="block ps-1 hover:bg-red-200 rounded text-xs hover:border border-green-100">Logout</a>
      </nav>
    </div>
  )
}

export default Sidebar

