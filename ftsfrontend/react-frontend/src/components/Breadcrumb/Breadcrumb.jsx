import { Link, useLocation  } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import { useEffect, useState } from "react";
// https://www.freecodecamp.org/news/react-navigation-build-a-breadcrumb-component/


export default function Breadcrumb() {
    const location = useLocation()
    // console.log(location.pathname)
    
    const knownPaths = ['/fts', '/fts/workspace/team/:id', '/fts/workspace/teammembership/delete/:id',
      '/fts/workspace/team/update/:id', '/fts/workspace/team/:id/files-upload', '/fts/workspace','/fts/teams','/fts/teams/:id',
      '/fts/admin', '/fts/admin/admin-team', '/fts/admin/admin-files', '/fts/admin/admin-user',
      '/fts/admin/admin-modification', '/fts/admin/admin-accesscode'
    ]

    const urlName = location.pathname.slice(1) //remove the first /
    // console.log('urlname',urlName)
    // fts/admin/admin-files or /fts/teams/76 is what we get 
    const urlList = urlName.split('/').slice(1) //get a array of the string broken at the / and remove fts item
    const urlListWithPlaceholderId = urlList.map(pathSegments=>{
      return (
      /^\d+$/.test(pathSegments)
      ?':id' //for all items that are a regex int is turned into a ':id' string
      : pathSegments)
    })  //thus we get a array with url broken down into individual path and any id turned into a string that says ":id"


    // console.log("urlist",urlList)
    // console.log("path array with placeholder id", urlListWithPlaceholderId)
    const outPath = '/fts/' + urlList.slice(0).join('/')
    // console.log('real out path', outPath)

  return (
    <div className="bg-white ">
      <ul className=" flex p-2 gap-2 text-xs text-[#8d8d8d] items-center">
        <Link
          to={`/fts/`}
          className=" cursor-pointer  hover:underline">
          Crumpet
        </Link>
        <AiOutlineRight />
        {urlList.length>0
        ?<>
          {urlList.map((path, index)=>{
            const captialisedPath = path.charAt(0).toUpperCase() + path.slice(1) //converting each path first 
            // char into Caps
            const progressivePathRealId = '/fts/' + urlList.slice(0, index+1).join('/') //join with fts so we can get a 
            // real path to navigate to
            const progressivePathPlaceholder = '/fts/' + urlListWithPlaceholderId.slice(0, index+1).join('/')
            //rember the last index of slice is exclusive
            // console.log('progressive paths with real id', progressivePathRealId)
            // console.log('progressive paths with :id', progressivePathPlaceholder)

            return (
              <div className="flex flex-row" key={index}>
                {knownPaths.includes(progressivePathPlaceholder)
                ?<Link
                  to={progressivePathRealId}
                  className=" cursor-pointer hover:underline">
                  {captialisedPath}
                </Link>
                :<div>
                  {captialisedPath}
                </div>
                }
                
                {index<urlList.length-1
                ?<div className="flex justify-center items-center ps-1"> <AiOutlineRight /></div> 
                :<></>}
              </div>)
            }
          )}
        </>
        :<Link
            to={`/fts/dashboard`}
            className=" cursor-pointer hover:underline">
            Dashboard
          </Link>}
      </ul>
    </div>
  );
}