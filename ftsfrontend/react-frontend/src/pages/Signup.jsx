import { data, useNavigate } from "react-router-dom";
import { useAuth } from "../authentication/authProvider";
import InputLabel from "./InputLabel";
import AuthButton from "./AuthButton";
import AuthBanner from "./AuthBanner";
import { useState } from "react";

// for api
import axios from 'axios';

const Signup = () => {
  const [message, setMessage] = useState(null);
  const [inputData, setInputData ] = useState({
    username:"",
    email:"",
    password:""
  })
  // this is for loading state, i want to put a spinner while the form is sbumitting
  const [loading, setLoading] = useState(false);

  // const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const {name, value} = e.target;
    setInputData(prev =>({
      ...prev,
      [name]: value
    }))
  }

  const onSubmitHandler = async  (e) => {
    e.preventDefault();

    console.log("Form submitted:", inputData);
  
    // Simulate successful signup and redirect

    // navigate("/", { replace: true });
  

    // https://axios-http.com/docs/post_example

    if (!inputData.username || !inputData.email || !inputData.password) {
      setMessage("All fields are required.");
      return;
    }

    setLoading(true);
    setMessage(null);
    try {
      const response = await axios.post('http://127.0.0.1:8000/accounts/signup/', inputData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true, // Optional: only needed if cookies are set
      });

      if (response.status === 201) {
        // User created
        console.log("User successfully created:", response.data);
        setMessage("Signup successful!");
      }

      
      console.log('catching response data', response.data);
      // https://axios-http.com/docs/handling_errors
    } catch (error) {
      if (error.response) {
        // first we get hold of the error data
      const data = error.response.data
      // the data we will get will be an object with keys username, email, password. we will extract them
      // however the values of these may be a single string or an array of strings, hence we need to check
      // if they are just a string or an array of strings in that case we will join all the strings together with a comma
      const getErrorMessage = (field) => Array.isArray(field) ? field.join(', ') : '';

      const usernameError = getErrorMessage(data.username);
      const emailError = getErrorMessage(data.email);
      const passwordError = getErrorMessage(data.password);

      const finalMessage = [ usernameError || emailError || passwordError || "Error found" ]
        setMessage(finalMessage);
        console.error('Error response:', error.response.data);
      } else {
        setMessage('Error: Could not connect to server.');
        console.error(error.response.data)
      }
      // this is for the spinner animation state
    } finally {
      setLoading(false);
    }
  }

  return (
  <>
    <div className="flex flex-col justify-center items-center min-h-screen pt-14 pb-10">
        <div className="formdiv flex flex-col w-1/3 px-10 border border-gray-200 
        min-h-[500px] pb-3" //these classes are to keep the signup button stay inside the form when the validation messgae shows
        >
          <AuthBanner title = {"Sign Up Here"} subtitle={"Please enter your details to make an account"}/>
          <div className="formcard">

            <form onSubmit={onSubmitHandler}>
              <div className="flex flex-col">
                <InputLabel id={"username"} name={"username"} inputType={"text"} 
                  inputValue={inputData.username} labelName={"Username"}
                  placeholder={"Username"} onChange={onChangeHandler}/>
                <div className="mb-3"></div>
                {message && (
                    <div className="text-red-500 mb-3 border border-red-500 p-2 rounded bg-red-50">
                      {message}
                    </div>
                  )}
                <InputLabel id={"email"} name={"email"} inputType={"email"}
                  inputValue={inputData.email} labelName={"Email"}
                  placeholder={"Email"} onChange={onChangeHandler}/>
                <div className="mb-3"></div>
                
                <InputLabel id={"password"} name={"password"} inputType={"password"}
                  inputValue={inputData.password} labelName={"Password"}
                  placeholder={"Password"} onChange={onChangeHandler}/>
                <div className="mb-3"></div>

                {loading ? (
                  <div className="flex justify-center items-center py-2">
                    <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <AuthButton buttonText={"Sign Up"} />

                )}
              </div>
            </form>
          </div>
        </div>
    </div>
  </>
  );
};

export default Signup;