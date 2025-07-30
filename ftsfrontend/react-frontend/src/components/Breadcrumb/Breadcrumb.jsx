import { Link, useLocation  } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
// https://www.freecodecamp.org/news/react-navigation-build-a-breadcrumb-component/


export default function Breadcrumb() {
    const location = useLocation()
    console.log(location.pathname)
    const urlName = location.pathname.slice(1)
    const urlList = urlName.split('/').slice(1)
    console.log(urlList)

  return (
    <div className="bg-white ">
      <ul className=" flex p-2 gap-2 text-xs text-[#8d8d8d] items-center">
        <Link
          to={`/fts/`}
          className=" cursor-pointer  hover:underline">
          FTS
        </Link>
        <AiOutlineRight />
        {urlList.length>0
        ?<>
          {urlList.map((path, index)=>{
            const captialisedPath = path.charAt(0).toUpperCase() + path.slice(1)
            const fullPath = '/fts/' + urlList.slice(0, index+1).join('/')
            console.log('new path', fullPath)
            return (
              <div className="flex flex-row" key={index}>
                <Link
                  to={fullPath}
                  className=" cursor-pointer hover:underline">
                  {captialisedPath}
                </Link>
                {index<urlList.length-1
                ?<AiOutlineRight />
                :<></>}
              </div>)
            }
          )}
        </>
        :<Link
            to={`/fts/dashboard`}
            className=" cursor-pointer hover:bg-[#E8DAEF] rounded-md transition-all duration-300">
            Dashboard
          </Link>}
        

        {/* {
          location.pathname.includes("/workspace") &&(
            <>
              <AiOutlineRight />
              <Link
                to={`/fts/workspace`}
                className=" cursor-pointer hover:bg-[#E8DAEF] rounded-md transition-all duration-300">
                Workspace
              </Link>
            </>
          )
        } */}

        
      </ul>
    </div>
  );
}