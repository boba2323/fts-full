import { useNavigate } from "react-router-dom";
import { useAuth } from "../authentication/authProvider";
import InputLabel from "./InputLabel";
import AuthButton from "./AuthButton";
import AuthBanner from "./AuthBanner";
import { useEffect, useState } from "react";
// for api
import axios from 'axios';
import Cookies from 'js-cookie';
const Logout = () => {
  const { userIn, setUserIn } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = async (e)=> {
    try {
        const response = await axios.post("http://127.0.0.1:8000/accounts/logout/",{}, {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
          },
          withCredentials: true, // Optional: only needed if cookies are set
        })
        setUserIn(null)
        console.log("logout?")
    }catch (error) {
      console.error(error)
    }
  }
    // navigate("/", { replace: true });


  return <>
  <div className="flex flex-col justify-center items-center h-screen pt-14 pb-10">
          <div className="formdiv w-1/3 px-10 border border-gray-200 h-full">
            <AuthBanner title = {"You are logging out"} subtitle={"Confirm you want to logout"}/>
            <div className="formcard">
              <div> {/* formerly a form */}
                <div className="flex flex-col">
                  {/* {message && (
                      <div className="text-red-500 mb-3 border border-red-500 p-2 rounded bg-red-50">
                        {message}
                      </div>
                    )} */}
                  <div className="mb-3"></div>
                  <AuthButton buttonText={"Logout"} type='button' onClick={logoutHandler}/>
                  {/* https://stackoverflow.com/questions/30915173/react-router-go-back-a-page-how-do-you-configure-history/62341050#62341050 */}
                  
                </div>
                <div className="register-div flex flex-col items-center justify-center pt-2 sm:text-xs
                  tracking-tight font-light
                  ">
                </div>
              </div>  
              <button>cancel</button>
            </div>
          </div>
      </div>
  </>;
};

export default Logout;