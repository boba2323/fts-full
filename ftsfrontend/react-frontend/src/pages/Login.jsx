import { useNavigate } from "react-router-dom";
import { useAuth } from "../authentication/authProvider";
import InputLabel from "./InputLabel";
import AuthButton from "./AuthButton";
import AuthBanner from "./AuthBanner";
import { useState } from "react";
// for api
import axios from 'axios';
const Login = () => {
  const { userIn, setUserIn, hitMeandFetch } = useAuth();
  const navigate = useNavigate();

  // this is for loading state, i want to put a spinner while the form is sbumitting
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [inputData, setInputData ] = useState({
        email:"",
        password:""
      })

  const onChangeHandler = (e) => {
    const {name, value} = e.target;
    setInputData(prev =>({
      ...prev,
      [name]: value
    }))
  }

  const onLoginHandler = async (e) => {
    e.preventDefault()
    if (!inputData.email || !inputData.password) {
      setMessage("All fields are required.");
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/accounts/api/token/', inputData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true, // Optional: only needed if cookies are set
      });
      console.log("hitting the login")
      // The login did not navigate to fts or next page at once
    // This is because the userIn state was not set at once after login, we manually set it after login to fix

      // setUserIn(response.data)

      if (response.status === 200) {
       // success login 
        console.log("Successfully logged in:", response.data);

        // we set userIn with function instead of just the state setter. this sets the userIn so the protected routes work
        await hitMeandFetch();
        setMessage("Login successfull");
        // we seeit can navigate to unprotected routes but not to protected routes
        // for protected routes we have to set userIn in state so the protectedroutes component can access it when we 
        // apply it in routes/index.
        // moreover we can also make it redirect to a non protected page and proceed from there but we chose to
        // naviagate to fts now 
        navigate("/fts", { replace: true });
      }

      
      console.log('catching response data', response.data);
      // https://axios-http.com/docs/handling_errors
    } catch (error) {
      if (error.response) {
        // first we get hold of the error data
          const errorData = error.response.data
          // the data we will get will be an object with keys username, email, password. we will extract them
          // however the values of these may be a single string or an array of strings, hence we need to check
          // if they are just a string or an array of strings in that case we will join all the strings together with a comma
          const getErrorMessage = (field) => {
            if (Array.isArray(field)) 
              return field.join(', ');
            if (typeof field === "string") {
              return field;
            } else {
              return ''
            }
          }
            
          console.log(errorData)
          const emailError = getErrorMessage(errorData.email);
          const passwordError = getErrorMessage(errorData.password);
          const loginDetail = getErrorMessage(errorData.detail);
          console.log("no login")
          const finalMessage = [ emailError || passwordError || loginDetail || "Error found" ]
          setMessage(finalMessage);
          console.error('Error response:', error.response.data);
      } else {
        console.error("Axios config/setup error:", error.message);
        setMessage('Error: Could not connect to server.');
        // console.error(error.response.data)
      }
      // this is for the spinner animation state
    } finally {
      setLoading(false);
    }
  }
  return (
  <>
  <div className="flex flex-col justify-center items-center h-screen pt-14 pb-10">
        <div className="formdiv w-1/3 px-10 border border-gray-200 h-full">
          <AuthBanner title = {"Welcome Back"} subtitle={"Please enter your details here"}/>
          <p className="flex justify-center items-center sm:text-xs text-green-700 mb-4">We encourage you to use a fake email to view this app</p>
          <div className="formcard">
            <form onSubmit={onLoginHandler}>
              <div className="flex flex-col">
                {message && (
                    <div className="text-red-500 mb-3 border border-red-500 p-2 rounded bg-red-50">
                      {message}
                    </div>
                  )}
                <InputLabel 
                  labelName={"Email"}
                  name="email"
                  inputType="email"
                  value={inputData.email}
                  placeholder="email"
                  onChange={onChangeHandler} 
                />
                <div className="mb-3"></div>
                <InputLabel 
                  labelName={"Password"}
                  name="password"
                  inputType="password"
                  value={inputData.password}
                  placeholder="password"
                  onChange={onChangeHandler} 
                />
                <span className="flex flex-end justify-end sm:text-xs text-green-700 italic">
                  <a href="">Forgot password?</a>
                </span>
                <div className="mb-3"></div>
                <AuthButton buttonText={"Login"} />
              </div>
              <div className="register-div flex flex-col items-center justify-center pt-2 sm:text-xs
                tracking-tight font-light
                ">
                  <p>If you dont have an account, <a href="" className="text-green-700 italic font-semibold">register here</a></p>
              </div> 
            </form>
          </div>
        </div>
    </div>
  
    </>
  );
};

export default Login;