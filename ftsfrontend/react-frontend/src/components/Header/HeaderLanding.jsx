import React from 'react'
import { useAuth } from "../../authentication/authProvider"
import { Link } from 'react-router-dom'
// import './header.css'
import { useEffect, useState } from 'react'
// https://www.skillthrive.com/posts/change-nav-on-scroll

const HeaderLanding = () => {
    const [scrollPosition, setScrollPosition] = useState(0)
    const useScrollPosition = () => {
        useEffect(() => {
            const updatePosition = () => {
            setScrollPosition(window.pageYOffset)
            }

            window.addEventListener('scroll', updatePosition)
            updatePosition()

            return () => window.removeEventListener('scroll', updatePosition)
        }, [])
        return scrollPosition
    }
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const {userIn} =useAuth()
    const scrollPos = useScrollPosition()
    return (
        
    <nav
        className={classNames(
            "w-full h-16 flex flex-row fixed top-0 z-20 transition-all duration-400 ease-in-out",
            scrollPos > 0
            ? "bg-white shadow"
            : "bg-gradient-to-r from-purple-700 to-purple-300 "
        )}
        >
        <div className="flag-2 flex ps-6 flex-row justify-start items-center w-10/12">
            <Link to={``} >
            <div className="flag py-2 ">
                <div className={scrollPos > 0 
                ?"top text-xl font-extrabold tracking-widest text-gray-700"
                :"top text-xl font-extrabold tracking-widest text-gray-50"
                }>Crumpet</div>
                <div className={scrollPos > 0 
                ? "bottom text-xs font-medium text-gray-700"
                : "bottom text-xs font-medium text-gray-300"
                }>A file system</div>
            </div>
            </Link>

            <p className={scrollPos > 0 
                ? "top  ps-4 ms-10 font-semibold text-gray-500"
                : "top  ps-4 ms-10 font-semibold text-gray-50"}>Effectively secure your teams and files</p>
        </div>
            {userIn?
                <>
                <div className="rightsideheadr flex flex-row justify-end items-center w-2/12">
                    <div className="profile flex flex-row justify-end items-center pe-6 py-1 ps-4  my-1 rounded-md me-4">
                        {/* <div className="userInfo pe-3">
                            <p className='text-xs text-gray-900 font-normal'>{userIn.email}</p>
                            {userIn.belongs_to_team
                            ?<p className='text-xs text-gray-900 font-thin'>Team: {userIn.belongs_to_team}</p>
                            :<p className='text-xs text-gray-900 font-thin'>Team: None</p>}
                            
                        </div> */}
                        <div className="userbox border-1 flex flex-row justify-center items-center text-center bg-orange-400 w-10 h-10 rounded-full">
                            <p className='text-xs text-gray-100 '>{userIn.username}</p>
                        </div>
                    </div>
                </div>
                </> :<div className={scrollPos > 0
                    ?"flex justify-center items-center userbox border-2 bg-white border-orange-300 w-20 m-2 rounded-md text-gray-700"
                    :"flex justify-center items-center userbox border-2  bg-orange-300 border-orange-300 w-20 m-2 font-semibold rounded-md text-gray-700"}>
                        <p className='text-base '>Login</p>
                    </div>
            }
    </nav>
  )
}

export default HeaderLanding
